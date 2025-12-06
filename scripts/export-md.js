import fs from 'fs';
import path from 'path';

const tokens = JSON.parse(
  fs.readFileSync('./dist-tokens/antd-tokens.json', 'utf-8')
);

function genTable(title, obj) {
  let md = `\n## ${title}\n\n`;
  md += '| Token 名称 | 值 |\n';
  md += '|-----------|-----|\n';

  for (const key in obj) {
    md += `| \`${key}\` | \`${obj[key]}\` |\n`;
  }

  return md;
}

let outputMD = '# Ant Design Token 全集\n';

outputMD += genTable('SeedToken', tokens.seedTokens);
outputMD += genTable('AliasToken (MapToken)', tokens.aliasTokens);

fs.writeFileSync('./dist-tokens/antd-tokens.md', outputMD);

console.log('📘 已导出 Markdown => dist-tokens/antd-tokens.md');
