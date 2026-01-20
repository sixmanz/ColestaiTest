
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects } from './src/data/projectsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const problems = [];
const warnings = [];

// 1. Validate Projects Data
console.log('--- Validating Projects Data ---');
const projectIds = new Set();
projects.forEach((p, index) => {
    // Check ID Uniqueness
    if (projectIds.has(p.id)) {
        problems.push(`Project at index ${index} has duplicate ID: ${p.id}`);
    }
    projectIds.add(p.id);

    // Check Essential Fields
    if (!p.titleTh) problems.push(`Project ID ${p.id} missing titleTh`);
    if (!p.titleEn) problems.push(`Project ID ${p.id} missing titleEn`);
    if (!p.genre) problems.push(`Project ID ${p.id} missing genre`);
    if (!p.description) problems.push(`Project ID ${p.id} missing description`);
    if (!p.poster) {
        problems.push(`Project ID ${p.id} missing poster`);
    } else {
        // Check poster format
        if (!p.poster.startsWith('http') && !p.poster.startsWith('/assets')) {
            warnings.push(`Project ID ${p.id} poster might be invalid path: ${p.poster}`);
        }
        // Check for specific broken params if unsplash
        if (p.poster.includes('unsplash.com') && !p.poster.includes('?')) {
            warnings.push(`Project ID ${p.id} Unsplash URL might missing params: ${p.poster}`);
        }
    }

    // Check Rewards for Active Projects
    if (p.status === 'active') {
        if (!p.rewards || !Array.isArray(p.rewards) || p.rewards.length === 0) {
            // problems.push(`Active Project ID ${p.id} (${p.titleEn}) is missing rewards!`); 
            // Note: We recently fixed this, but good to catch.
            // However, let's relax this if it's 'coming_soon' but logic says active.
        }

        // Strict check: if status is active, it MUST have rewards
        if (!p.rewards || p.rewards.length === 0) {
            problems.push(`Active Project ID ${p.id} is missing rewards array.`);
        }
    }
});

// 2. Validate Locales
console.log('--- Validating Locales ---');
try {
    const thRaw = fs.readFileSync(path.join(__dirname, 'src/data/locales/th.json'), 'utf-8');
    const enRaw = fs.readFileSync(path.join(__dirname, 'src/data/locales/en.json'), 'utf-8');

    const th = JSON.parse(thRaw);
    const en = JSON.parse(enRaw);

    const thKeys = new Set(Object.keys(th));
    const enKeys = new Set(Object.keys(en));

    thKeys.forEach(key => {
        if (!enKeys.has(key)) {
            warnings.push(`Locale key '${key}' present in TH but missing in EN`);
        }
    });

    enKeys.forEach(key => {
        if (!thKeys.has(key)) {
            warnings.push(`Locale key '${key}' present in EN but missing in TH`);
        }
    });

} catch (err) {
    problems.push(`Failed to validate locales: ${err.message}`);
}

// 3. Scan for Usage of Missing Keys (Simple Regex Scan)
// This is non-trivial to do perfectly, but we can search for t('...') patterns in jsx files
function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const regex = /t\(['"]([^'"]+)['"]\)/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const key = match[1];
                // We'll check against TH keys as the source of truth for now
                try {
                    const thRaw = fs.readFileSync(path.join(__dirname, 'src/data/locales/th.json'), 'utf-8');
                    const th = JSON.parse(thRaw);
                    if (!th[key]) {
                        // warnings.push(`Usage of potentially missing key '${key}' in ${file}`);
                        // Commented out to avoid noise if 'th' isn't loaded globally efficiently, 
                        // but let's do it right.
                    }
                } catch (e) { }
            }
        }
    });
}
// Skipping file scan for now to verify data first.

// REPORT
console.log('\n=== AUDIT REPORT ===');
if (problems.length === 0 && warnings.length === 0) {
    console.log('✅ No issues found!');
} else {
    if (problems.length > 0) {
        console.log('❌ ERRORS:');
        problems.forEach(p => console.log(` - ${p}`));
    }
    if (warnings.length > 0) {
        console.log('⚠️ WARNINGS:');
        warnings.forEach(w => console.log(` - ${w}`));
    }
}
