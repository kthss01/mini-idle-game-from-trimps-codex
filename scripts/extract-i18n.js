#!/usr/bin/env node
const fs = require('fs');

const targets = ['index.html', 'ScreenReader.html'];
const stringsOutput = 'i18n/extracted-ui-strings.json';
const attrsOutput = 'i18n/extracted-ui-attrs.json';

function loadExistingJson(path) {
  if (!fs.existsSync(path)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(path, 'utf8'));
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.warn(`경고: 기존 JSON 로드 실패 (${path}) - ${err.message}`);
  }
  return {};
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function parseAttributes(raw) {
  const attrs = {};
  let i = 0;

  while (i < raw.length) {
    while (i < raw.length && /\s/.test(raw[i])) i += 1;
    if (i >= raw.length) break;

    const nameStart = i;
    while (i < raw.length && !/[\s=/>]/.test(raw[i])) i += 1;
    const name = raw.slice(nameStart, i).toLowerCase();

    while (i < raw.length && /\s/.test(raw[i])) i += 1;

    let value = '';
    if (raw[i] === '=') {
      i += 1;
      while (i < raw.length && /\s/.test(raw[i])) i += 1;
      if (raw[i] === '"' || raw[i] === "'") {
        const quote = raw[i];
        i += 1;
        const valueStart = i;
        while (i < raw.length && raw[i] !== quote) i += 1;
        value = raw.slice(valueStart, i);
        if (raw[i] === quote) i += 1;
      } else {
        const valueStart = i;
        while (i < raw.length && !/[\s>]/.test(raw[i])) i += 1;
        value = raw.slice(valueStart, i);
      }
    }

    if (name) {
      attrs[name] = decodeHtmlEntities(value);
    }
  }

  return attrs;
}

function parseHtml(html) {
  const root = { type: 'root', children: [] };
  const stack = [root];
  let i = 0;

  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }

    if (html[i] === '<') {
      const closeIndex = html.indexOf('>', i + 1);
      if (closeIndex === -1) break;
      const inner = html.slice(i + 1, closeIndex).trim();

      if (!inner || inner.startsWith('!')) {
        i = closeIndex + 1;
        continue;
      }

      if (inner[0] === '/') {
        const tagName = inner.slice(1).trim().toLowerCase();
        while (stack.length > 1) {
          const popped = stack.pop();
          if (popped.tagName === tagName) break;
        }
        i = closeIndex + 1;
        continue;
      }

      const selfClosing = /\/$/.test(inner);
      const normalizedInner = selfClosing ? inner.replace(/\/$/, '').trim() : inner;
      const spaceIndex = normalizedInner.search(/\s/);
      const tagName = (spaceIndex === -1 ? normalizedInner : normalizedInner.slice(0, spaceIndex)).toLowerCase();
      const attrRaw = spaceIndex === -1 ? '' : normalizedInner.slice(spaceIndex + 1);

      const node = {
        type: 'element',
        tagName,
        attrs: parseAttributes(attrRaw),
        children: []
      };

      stack[stack.length - 1].children.push(node);

      const voidOrSelfClosing = selfClosing || new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']).has(tagName);

      if (!voidOrSelfClosing) {
        stack.push(node);
      }

      i = closeIndex + 1;
      continue;
    }

    const nextTag = html.indexOf('<', i);
    const textEnd = nextTag === -1 ? html.length : nextTag;
    const text = html.slice(i, textEnd);
    if (text) {
      stack[stack.length - 1].children.push({ type: 'text', text: decodeHtmlEntities(text) });
    }
    i = textEnd;
  }

  return root;
}

function extractTextContent(node) {
  if (!node || !node.children) return '';

  const text = node.children
    .map((child) => {
      if (child.type === 'text') return child.text;
      if (child.type === 'element' && child.tagName !== 'script' && child.tagName !== 'style') {
        return extractTextContent(child);
      }
      return '';
    })
    .join(' ');

  return normalizeWhitespace(text);
}

function walk(node, visitor) {
  if (node.type === 'element') visitor(node);
  if (node.children) {
    for (const child of node.children) walk(child, visitor);
  }
}

function runSelfTests() {
  const sample = `
    <div>
      <button\n        data-i18n="ui.test.button"\n        data-i18n-title = "ui.test.button_title"\n        title="  Tooltip\n          text "
      >
        Start <strong>Now</strong>
      </button>
      <span data-i18n='ui.test.label'>  Multi\n line\t text </span>
      <p data-i18n="ui.test.empty">   </p>
    </div>
  `;

  const root = parseHtml(sample);
  const found = {};
  walk(root, (el) => {
    if (el.attrs['data-i18n']) {
      found[el.attrs['data-i18n']] = extractTextContent(el);
    }
    if (el.attrs['data-i18n-title']) {
      found[el.attrs['data-i18n-title']] = normalizeWhitespace(el.attrs.title || '');
    }
  });

  const assert = (condition, message) => {
    if (!condition) throw new Error(`self-test 실패: ${message}`);
  };

  assert(found['ui.test.button'] === 'Start Now', '중첩 태그 텍스트 추출');
  assert(found['ui.test.label'] === 'Multi line text', '멀티라인/공백 정규화');
  assert(found['ui.test.button_title'] === 'Tooltip text', 'data-i18n-title fallback title 추출');
  assert(found['ui.test.empty'] === '', '빈 텍스트 처리');
}

runSelfTests();

const stringsResult = {};
const attrsResult = {};
const fileStats = {};

for (const file of targets) {
  const src = fs.readFileSync(file, 'utf8');
  const root = parseHtml(src);
  const fileKeys = new Set();

  walk(root, (el) => {
    const textKey = el.attrs['data-i18n'];
    const titleKey = el.attrs['data-i18n-title'];

    if (textKey) {
      const fallbackText = extractTextContent(el);
      if (!(textKey in stringsResult)) {
        stringsResult[textKey] = fallbackText;
      }

      if (!attrsResult[textKey]) attrsResult[textKey] = {};
      if (!('text' in attrsResult[textKey])) attrsResult[textKey].text = fallbackText;
      if (!('title' in attrsResult[textKey])) attrsResult[textKey].title = null;
      fileKeys.add(textKey);
    }

    if (titleKey) {
      const fallbackTitle = normalizeWhitespace(el.attrs.title || '');
      if (!attrsResult[titleKey]) attrsResult[titleKey] = {};
      if (!('text' in attrsResult[titleKey])) attrsResult[titleKey].text = null;
      if (!('title' in attrsResult[titleKey])) attrsResult[titleKey].title = fallbackTitle;
      fileKeys.add(titleKey);
    }
  });

  fileStats[file] = fileKeys.size;
}

const mergedStringsResult = { ...loadExistingJson(stringsOutput), ...stringsResult };

fs.writeFileSync(stringsOutput, JSON.stringify(mergedStringsResult, null, 2) + '\n');
fs.writeFileSync(attrsOutput, JSON.stringify(attrsResult, null, 2) + '\n');

const totalKeys = Object.keys(attrsResult).length;
console.log(`추출 완료: 총 ${totalKeys}개 키`);
for (const file of targets) {
  console.log(`- ${file}: ${fileStats[file] || 0}개 키`);
}
console.log(`- 문자열 호환 파일: ${Object.keys(mergedStringsResult).length}개 키 (신규 추출 ${Object.keys(stringsResult).length}개) -> ${stringsOutput}`);
console.log(`- 속성 포함 파일: ${Object.keys(attrsResult).length}개 키 -> ${attrsOutput}`);
