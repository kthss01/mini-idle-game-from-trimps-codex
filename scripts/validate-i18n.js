#!/usr/bin/env node
const fs = require('fs');
const vm = require('vm');

const extractedStringsPath = 'i18n/extracted-ui-strings.json';
const extractedAttrsPath = 'i18n/extracted-ui-attrs.json';
const localeFiles = {
  en: 'i18n/locales/en.js',
  ko: 'i18n/locales/ko.js'
};

const runtimeScanFiles = ['main.js', 'objects.js', 'updates.js', 'config.js', 'playerSpire.js'];

// 동적 키 규칙: false positive 방지를 위해 허용 패턴과 예외를 명시적으로 관리한다.
const dynamicKeyRules = {
  // `i18n.t(`ui.some_prefix.${expr}`)` 형태 사용 시, 아래 접두사만 허용한다.
  allowedTemplatePrefixes: [],
  // 아래 표현식은 동적 키로 감지되더라도 검증 경고에서 제외한다.
  ignoredExpressions: new Set([])
};

const extractedStrings = JSON.parse(fs.readFileSync(extractedStringsPath, 'utf8'));
const extractedAttrs = JSON.parse(fs.readFileSync(extractedAttrsPath, 'utf8'));
const extractedKeys = new Set([...Object.keys(extractedStrings), ...Object.keys(extractedAttrs)]);

function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return acc.concat(flatten(value, path));
    }
    acc.push(path);
    return acc;
  }, []);
}

function loadLocale(locale, filePath) {
  const scriptSource = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(scriptSource, context, { filename: filePath });

  const data = context.window?.I18N_LOCALES?.[locale];
  if (!data) {
    throw new Error(`${filePath}에서 ${locale} 로케일 데이터를 찾을 수 없습니다.`);
  }

  return flatten(data);
}

function splitFirstArg(callText) {
  let i = 0;
  let quote = null;
  let escaped = false;
  let templateExprDepth = 0;
  let parenDepth = 0;

  while (i < callText.length) {
    const ch = callText[i];
    const next = callText[i + 1];

    if (escaped) {
      escaped = false;
      i += 1;
      continue;
    }

    if (quote) {
      if (ch === '\\') {
        escaped = true;
      } else if (quote === '`' && ch === '$' && next === '{') {
        templateExprDepth += 1;
        i += 2;
        continue;
      } else if (quote === '`' && templateExprDepth > 0) {
        if (ch === '{') templateExprDepth += 1;
        if (ch === '}') templateExprDepth -= 1;
      } else if (ch === quote) {
        quote = null;
      }
      i += 1;
      continue;
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      quote = ch;
      i += 1;
      continue;
    }

    if (ch === '(') {
      parenDepth += 1;
    } else if (ch === ')') {
      if (parenDepth === 0) break;
      parenDepth -= 1;
    } else if (ch === ',' && parenDepth === 0) {
      break;
    }

    i += 1;
  }

  return callText.slice(0, i).trim();
}

function extractCallBody(source, openParenIndex) {
  let i = openParenIndex + 1;
  let quote = null;
  let escaped = false;
  let templateExprDepth = 0;
  let parenDepth = 1;

  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];

    if (escaped) {
      escaped = false;
      i += 1;
      continue;
    }

    if (quote) {
      if (ch === '\\') {
        escaped = true;
      } else if (quote === '`' && ch === '$' && next === '{') {
        templateExprDepth += 1;
        i += 2;
        continue;
      } else if (quote === '`' && templateExprDepth > 0) {
        if (ch === '{') templateExprDepth += 1;
        if (ch === '}') templateExprDepth -= 1;
      } else if (ch === quote) {
        quote = null;
      }
      i += 1;
      continue;
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      quote = ch;
      i += 1;
      continue;
    }

    if (ch === '(') {
      parenDepth += 1;
    } else if (ch === ')') {
      parenDepth -= 1;
      if (parenDepth === 0) {
        return source.slice(openParenIndex + 1, i);
      }
    }

    i += 1;
  }

  return null;
}

function parseLiteralKey(arg) {
  const trimmed = arg.trim();
  if (!trimmed) return null;

  const quote = trimmed[0];
  const endQuote = trimmed[trimmed.length - 1];
  if ((quote === '\'' || quote === '"') && endQuote === quote) {
    return trimmed.slice(1, -1);
  }

  if (quote === '`' && endQuote === '`' && !trimmed.includes('${')) {
    return trimmed.slice(1, -1);
  }

  return null;
}

function scanRuntimeKeys(files) {
  const literalKeys = new Set();
  const dynamic = [];
  const callPattern = /i18n\.t\s*\(/g;

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, 'utf8');
    let match;

    while ((match = callPattern.exec(source)) !== null) {
      const openParenIndex = callPattern.lastIndex - 1;
      const body = extractCallBody(source, openParenIndex);
      if (body == null) continue;

      const firstArg = splitFirstArg(body);
      const literalKey = parseLiteralKey(firstArg);
      if (literalKey != null) {
        literalKeys.add(literalKey);
        continue;
      }

      if (dynamicKeyRules.ignoredExpressions.has(firstArg)) {
        continue;
      }

      const prefixMatch = firstArg.match(/^`([^`$]*)\$\{/);
      const isAllowedTemplatePrefix = prefixMatch
        ? dynamicKeyRules.allowedTemplatePrefixes.includes(prefixMatch[1])
        : false;

      if (!isAllowedTemplatePrefix) {
        dynamic.push({ filePath, expression: firstArg });
      }
    }
  }

  return { literalKeys, dynamic };
}

const runtimeScan = scanRuntimeKeys(runtimeScanFiles);
const runtimeKeys = runtimeScan.literalKeys;
const runtimeOnlyKeys = new Set([...runtimeKeys].filter((key) => !extractedKeys.has(key)));
const expectedKeys = new Set([...extractedKeys, ...runtimeKeys]);

let hasError = false;

if (runtimeScan.dynamic.length) {
  hasError = true;
  console.error('\n[dynamic-keys] 검증 실패: 정적 분석할 수 없는 i18n.t(...) 호출이 있습니다.');
  for (const item of runtimeScan.dynamic) {
    console.error(`  - ${item.filePath}: ${item.expression}`);
  }
}

for (const [locale, filePath] of Object.entries(localeFiles)) {
  const localeKeys = new Set(loadLocale(locale, filePath));
  const missing = [...expectedKeys].filter((key) => !localeKeys.has(key));
  const unused = [...localeKeys].filter((key) => !expectedKeys.has(key));
  const runtimeOnly = [...runtimeOnlyKeys].filter((key) => localeKeys.has(key));

  if (missing.length || unused.length || runtimeOnly.length) {
    if (missing.length || unused.length) {
      hasError = true;
      console.error(`\n[${locale}] 검증 실패`);
    } else {
      console.log(`\n[${locale}] 검증 경고`);
    }

    if (missing.length) {
      console.error(`  - missing (${missing.length}): ${missing.join(', ')}`);
    }
    if (unused.length) {
      console.error(`  - unused (${unused.length}): ${unused.join(', ')}`);
    }
    if (runtimeOnly.length) {
      console.log(`  - runtime-only (${runtimeOnly.length}): ${runtimeOnly.join(', ')}`);
    }
  } else {
    console.log(`[${locale}] 검증 통과 (${localeKeys.size} keys)`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log('\n모든 로케일 검증이 완료되었습니다.');
