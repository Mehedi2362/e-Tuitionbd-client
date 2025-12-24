#!/usr/bin/env node
/**
 * Bundle Size Analyzer
 * Creates temp vite config for analysis, generates simple report
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')

// ============================================================
// CONFIGURATION - Modify these variables as needed
// ============================================================
const CONFIG = {
    // Output folder for reports (relative to root)
    docsFolder: '.docs',

    // Report filename
    reportFileName: 'bundle-report.md',

    // Temporary config filename (will be deleted after analysis)
    tempConfigName: 'vite.analyze.config.ts',

    // Temporary build output folder (will be deleted after analysis)
    tempBuildFolder: 'dist-analyze',

    // Package manager command
    packageManager: 'pnpm',

    // Minifier to use
    minifier: 'terser',
}
// ============================================================

// Resolved paths
const docsDir = path.join(ROOT, CONFIG.docsFolder)
const pkgPath = path.join(ROOT, 'package.json')
const tempConfigPath = path.join(ROOT, CONFIG.tempConfigName)
const reportFile = path.join(docsDir, CONFIG.reportFileName)

// Check if terser is installed, if not install it
function ensureTerser() {
    try {
        execSync(`${CONFIG.packageManager} list ${CONFIG.minifier}`, { cwd: ROOT, stdio: 'ignore' })
    } catch {
        console.log(`📦 ${CONFIG.minifier} not found, installing...\n`)
        execSync(`${CONFIG.packageManager} add -D ${CONFIG.minifier}`, { cwd: ROOT, stdio: 'inherit' })
        console.log('')
    }
}

ensureTerser()

// Create docs folder
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true })

// Timestamp
const now = new Date()

// Read dependencies
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const directDeps = Object.keys(pkg.dependencies || {})

console.log('🔍 Analyzing bundle...\n')

// Create temp vite config for analysis
const tempConfig = `import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: '${CONFIG.tempBuildFolder}',
        sourcemap: true,
        minify: '${CONFIG.minifier}',
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        const match = id.match(/node_modules\\/\\.pnpm\\/([^/]+)/)
                        if (match) {
                            const pnpmName = match[1]
                            const atIndex = pnpmName.lastIndexOf('@')
                            const pkgName = atIndex > 0 ? pnpmName.substring(0, atIndex).replace(/\\+/g, '/') : pnpmName
                            const scope = pkgName.startsWith('@') ? pkgName.split('/')[0] : pkgName.split('/')[0]
                            return \`pkg-\${scope.replace('@', '')}\`
                        }
                    }
                },
            },
        },
    },
})
`

fs.writeFileSync(tempConfigPath, tempConfig)

// Run analyze build with temp config
let analyzeOutput
try {
    analyzeOutput = execSync(`${CONFIG.packageManager} vite build --config ${tempConfigPath} 2>&1`, {
        cwd: ROOT,
        encoding: 'utf-8',
    })
} catch (e) {
    analyzeOutput = e.stdout || ''
}

// Cleanup temp config and dist
fs.unlinkSync(tempConfigPath)
try {
    fs.rmSync(path.join(ROOT, CONFIG.tempBuildFolder), { recursive: true, force: true })
} catch {}

// Parse output
const jsChunks = []
const cssChunks = []

const buildOutputPattern = new RegExp(`${CONFIG.tempBuildFolder}/assets/([^\\s]+)\\s+([0-9.]+)\\s*kB\\s*│\\s*gzip:\\s*([0-9.]+)\\s*kB`)

for (const line of analyzeOutput.split('\n')) {
    const match = line.match(buildOutputPattern)
    if (match) {
        const chunk = {
            filename: match[1],
            size: parseFloat(match[2]),
            gzip: parseFloat(match[3]),
        }
        if (match[1].endsWith('.js')) jsChunks.push(chunk)
        else if (match[1].endsWith('.css')) cssChunks.push(chunk)
    }
}

// Parse chunk name
function parseChunkName(filename) {
    let name = filename
        .replace(/-[A-Za-z0-9_]{8,}\.js$/, '')
        .replace(/^pkg-/, '')
        .replace(/[0-9]+\.[0-9]+\.[0-9]+.*$/, '')

    const scopes = ['radix-ui', 'tanstack', 'floating-ui', 'headlessui']
    for (const scope of scopes) {
        if (name === scope || name.startsWith(scope + '-')) {
            return { scope: `@${scope}`, name }
        }
    }
    return { scope: null, name }
}

// Match to direct dependency
function findDirectDep(chunkName) {
    const { scope, name } = parseChunkName(chunkName)

    for (const dep of directDeps) {
        const cleanDep = dep.replace('@', '').replace(/\//g, '-')
        if (name === cleanDep || name.startsWith(cleanDep)) return dep
    }

    if (scope) {
        for (const dep of directDeps) {
            if (dep.startsWith(scope + '/')) return dep
        }
    }

    for (const dep of directDeps.sort((a, b) => b.length - a.length)) {
        const baseName = dep.split('/').pop() || dep
        if (name === baseName || name.startsWith(baseName)) return dep
    }

    return null
}

// Group chunks
const depGroups = {}
const appCode = { size: 0, gzip: 0 }
const other = { size: 0, gzip: 0 }

for (const chunk of jsChunks) {
    const { name } = parseChunkName(chunk.filename)
    const directDep = findDirectDep(chunk.filename)

    if (directDep) {
        if (!depGroups[directDep]) depGroups[directDep] = { size: 0, gzip: 0 }
        depGroups[directDep].size += chunk.size
        depGroups[directDep].gzip += chunk.gzip
    } else if (name.startsWith('index') || name === 'vendor') {
        appCode.size += chunk.size
        appCode.gzip += chunk.gzip
    } else {
        other.size += chunk.size
        other.gzip += chunk.gzip
    }
}

// Calculate totals
const totalJS = jsChunks.reduce((s, c) => s + c.size, 0)
const totalGzip = jsChunks.reduce((s, c) => s + c.gzip, 0)
const cssSize = cssChunks.reduce((s, c) => s + c.size, 0)
const cssGzip = cssChunks.reduce((s, c) => s + c.gzip, 0)

const sortedDeps = Object.entries(depGroups).sort((a, b) => b[1].size - a[1].size)
const dateStr = now.toISOString().split('T')[0]
const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

// Generate simple report
let report = `# 📦 Bundle Size Report

**Generated:** ${dateStr} at ${timeStr}

---

## Dependencies (package.json)

| Dependency | Size | Gzip | % |
|:-----------|-----:|-----:|--:|
`

for (const [dep, data] of sortedDeps) {
    const pct = ((data.size / totalJS) * 100).toFixed(1)
    report += `| ${dep} | ${data.size.toFixed(2)} KB | ${data.gzip.toFixed(2)} KB | ${pct}% |\n`
}

report += `| Your Code | ${appCode.size.toFixed(2)} KB | ${appCode.gzip.toFixed(2)} KB | ${((appCode.size / totalJS) * 100).toFixed(1)}% |\n`

if (other.size > 0) {
    report += `| Other | ${other.size.toFixed(2)} KB | ${other.gzip.toFixed(2)} KB | ${((other.size / totalJS) * 100).toFixed(1)}% |\n`
}

report += `| **TOTAL** | **${totalJS.toFixed(2)} KB** | **${totalGzip.toFixed(2)} KB** | **100%** |

---

## CSS

| File | Size | Gzip |
|:-----|-----:|-----:|
`

for (const c of cssChunks) {
    report += `| ${c.filename} | ${c.size.toFixed(2)} KB | ${c.gzip.toFixed(2)} KB |\n`
}

report += `

---

## Summary

| Category | Size | Gzip |
|:---------|-----:|-----:|
| JS | ${totalJS.toFixed(2)} KB | ${totalGzip.toFixed(2)} KB |
| CSS | ${cssSize.toFixed(2)} KB | ${cssGzip.toFixed(2)} KB |
| **Total** | **${(totalJS + cssSize).toFixed(2)} KB** | **${(totalGzip + cssGzip).toFixed(2)} KB** |

---

*Generated with \`${CONFIG.packageManager} build\`*
`

fs.writeFileSync(reportFile, report)
console.log(report)

// Production build
console.log('\n📦 Building production...\n')
try {
    execSync(`${CONFIG.packageManager} vite build`, { cwd: ROOT, stdio: 'inherit' })
} catch (e) {
    console.error('Build failed')
    process.exit(1)
}

console.log(`\n✅ Report: ${CONFIG.docsFolder}/${CONFIG.reportFileName}`)
