// scripts/export-antd-tokens.js
// 适配 antd 5.0 ~ 5.19+ 所有版本
// 利用官方 theme API 获取 Token（Seed + Map + Alias）

import fs from 'fs';
import path from 'path';
import { theme } from 'antd';

// 1. 获取默认 SeedToken（antd v5.14+ 提供 defaultSeed）
const seed = theme.defaultSeed || theme.defaultConfig.token;

// 2. 获取 MapToken + AliasToken
const aliasTokens = theme.getDesignToken({ token: seed });

// 3. 合并结果
const output = {
  seedTokens: seed,
  aliasTokens,
  allTokens: { ...seed, ...aliasTokens },
};

// 4. 输出
const outDir = './dist-tokens';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

fs.writeFileSync(
  path.join(outDir, 'antd-tokens.json'),
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log('🎉 已导出完整 Token => dist-tokens/antd-tokens.json');
