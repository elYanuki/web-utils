// AI

const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, '..', 'dist', 'esm');
if (!fs.existsSync(esmDir)) {
    console.error('Directory not found:', esmDir);
    process.exit(1);
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.isFile() && (full.endsWith('.js') || full.endsWith('.mjs'))) {
            fixFile(full);
        }
    }
}

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // 1) from '...'
    content = content.replace(/from\s+(['"])(\.\.?\/[^'"]+?)(['"])/g, (m, q1, rel, q2) => {
        if (/\.[a-z0-9]+$/i.test(rel)) return m; // already has extension
        return `from ${q1}${rel}.mjs${q2}`;
    });

    // 2) dynamic import('...')
    content = content.replace(/import\(\s*(['"])(\.\.?\/[^'"]+?)(['"])\s*\)/g, (m, q1, rel, q2) => {
        if (/\.[a-z0-9]+$/i.test(rel)) return m;
        return `import(${q1}${rel}.mjs${q2})`;
    });

    // write back if changed
    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched imports in', filePath);
    }

    // If file was .js, rename to .mjs (avoid overwrite)
    if (filePath.endsWith('.js')) {
        const dest = filePath.replace(/\.js$/, '.mjs');
        if (fs.existsSync(dest)) {
            // if dest exists, remove source to avoid duplicates (optional)
            fs.unlinkSync(filePath);
            console.log('Removed original .js (dest existed):', filePath);
        } else {
            fs.renameSync(filePath, dest);
            console.log('Renamed', filePath, '->', dest);
        }
    }
}

walk(esmDir);
console.log('Done.');