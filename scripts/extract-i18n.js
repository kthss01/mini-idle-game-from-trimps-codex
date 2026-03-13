#!/usr/bin/env node
const fs = require('fs');

const targets = ['index.html', 'ScreenReader.html'];
const output = 'i18n/extracted-ui-strings.json';

const result = {};

for (const file of targets) {
  const src = fs.readFileSync(file, 'utf8');
  const matches = [...src.matchAll(/data-i18n="([^"]+)">([^<]+)</g)];
  for (const [, key, value] of matches) {
    result[key] = value.trim();
  }
}

fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
console.log(`추출 완료: ${Object.keys(result).length}개 키 -> ${output}`);
