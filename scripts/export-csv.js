import fs from 'fs';
import path from 'path';

const tokens = JSON.parse(
  fs.readFileSync('./dist-tokens/antd-tokens.json', 'utf-8')
);

const csvLines = [
  'Token 名称, 值, 来源类型(seed/map/alias)',
];

function writeGroup(obj, type) {
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === 'string') {
     value = value.replace(/,/g, "，").replace(/\r?\n|\r/g, '');
    }
    csvLines.push(`${key}, "${value}", ${type}`);
  }
}

writeGroup(tokens.seedTokens, 'seed');
writeGroup(tokens.aliasTokens, 'alias');

fs.writeFileSync('./dist-tokens/antd-tokens.csv', csvLines.join('\n'));

console.log('📄 已导出 CSV => dist-tokens/antd-tokens.csv');
