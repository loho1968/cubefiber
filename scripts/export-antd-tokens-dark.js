// scripts/export-antd-tokens.js
// 适配 antd 5.0 ~ 5.19+ 所有版本
// 利用官方 theme API 获取 Token（Seed + Map + Alias）

import fs from 'fs';
import path from 'path';
import { theme } from 'antd';

// 1. 获取默认 SeedToken（antd v5.14+ 提供 defaultSeed）
const seed = theme.darkAlgorithm

// 2. 获取 MapToken + AliasToken
const aliasTokens = theme.getDesignToken({  algorithm: theme.darkAlgorithm});

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
  path.join(outDir, 'antd-tokens-dark.json'),
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log('🎉 已导出完整 Token => dist-tokens/antd-tokens-dark.json');
/*
生成 AliasToken（最终组件可用 Token）
✅ 生成 Seed → Map → Alias 的继承关系表格（Markdown / CSV / Excel）
✅ 生成跨层对照图（Token 体系图）
✅ 生成设计系统文档（完整可打印）
*/