const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inputArg = args[0];
const outputArg = args[1];

const inputPath = inputArg ? path.resolve(process.cwd(), inputArg) : path.join(__dirname, '../dist-tokens/antd-tokens-dark.json');
const outputPath = outputArg ? path.resolve(process.cwd(), outputArg) : path.join(__dirname, '../dist-tokens/antd-tokens-dark.css');

function camelToKebab(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

try {
    const data = fs.readFileSync(inputPath, 'utf8');
    const json = JSON.parse(data);
    
    // Prefer aliasTokens, fallback to root or allTokens if needed.
    // Based on file inspection, aliasTokens seems to be the main one.
    const tokens = json.aliasTokens || json;

    let cssContent = ':root {\n';

    for (const [key, value] of Object.entries(tokens)) {
        if (typeof value === 'object' && value !== null) {
            // Skip nested objects if any, or handle them? 
            // The snippet showed flat key-values inside aliasTokens.
            continue;
        }
        
        const cssVarName = `--${key}`;
        let cssValue = value;
        
        if (typeof value === 'string') {
            // Remove newlines and extra spaces
            cssValue = value.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        }

        cssContent += `  ${cssVarName}: ${cssValue};\n`;
    }

    cssContent += '}\n';

    fs.writeFileSync(outputPath, cssContent);
    console.log(`Successfully generated ${outputPath}`);

} catch (error) {
    console.error('Error generating CSS:', error);
    process.exit(1);
}
