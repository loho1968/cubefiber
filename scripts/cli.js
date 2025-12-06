#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔧 开始生成 AntD Token 全集...');

execSync('node scripts/export-antd-tokens.js', { stdio: 'inherit' });
execSync('node scripts/export-csv.js', { stdio: 'inherit' });
execSync('node scripts/export-md.js', { stdio: 'inherit' });

console.log('✨ 全部导出完成！输出在 dist-tokens/ 文件夹中。');
