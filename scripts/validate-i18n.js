#!/usr/bin/env node
const fs = require('fs');
const vm = require('vm');

const extractedPath = 'i18n/extracted-ui-strings.json';
const localeFiles = {
  en: 'i18n/locales/en.js',
  ko: 'i18n/locales/ko.js'
};

const extracted = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
const extractedKeys = new Set(Object.keys(extracted));
const runtimeOnlyKeys = new Set(['ui.bone_trader.owned_prefix']);

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

let hasError = false;

for (const [locale, filePath] of Object.entries(localeFiles)) {
  const localeKeys = new Set(loadLocale(locale, filePath));
  const missing = [...extractedKeys].filter((key) => !localeKeys.has(key));
  const unused = [...localeKeys].filter((key) => !extractedKeys.has(key) && !runtimeOnlyKeys.has(key));

  if (missing.length || unused.length) {
    hasError = true;
    console.error(`\n[${locale}] 검증 실패`);
    if (missing.length) {
      console.error(`  - 누락 키 (${missing.length}): ${missing.join(', ')}`);
    }
    if (unused.length) {
      console.error(`  - 미사용 키 (${unused.length}): ${unused.join(', ')}`);
    }
  } else {
    console.log(`[${locale}] 검증 통과 (${localeKeys.size} keys)`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log('\n모든 로케일 검증이 완료되었습니다.');
