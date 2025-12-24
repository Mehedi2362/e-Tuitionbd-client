#!/usr/bin/env node

/**
 * Sync Snippets
 * Merges ALL snippets from .snippets/ folder into a single file in .vscode/
 * Copies README.md files to .docs/snippets/ with updated links
 *
 * Usage: pnpm sync:snippets
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..', '..')

// ============================================================
// CONFIGURATION - Modify these variables as needed
// ============================================================
const CONFIG = {
    // Source folder containing snippet categories (relative to root)
    snippetsFolder: '.snippets',

    // Output folder for VS Code snippets (relative to root)
    vscodeFolder: '.vscode',

    // Output folder for documentation (relative to root)
    docsFolder: '.docs/snippets',

    // Output filename for merged snippets
    outputFileName: 'project.code-snippets',

    // Snippet file extension
    snippetExtension: '.code-snippets',

    // Readme filename to copy
    readmeFileName: 'README.md',
}
// ============================================================

// Resolved paths
const snippetsDir = path.join(rootDir, CONFIG.snippetsFolder)
const vscodeDir = path.join(rootDir, CONFIG.vscodeFolder)
const docsSnippetsDir = path.join(rootDir, CONFIG.docsFolder)

// Colors for terminal output
const colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
}

/**
 * Recursively find all .code-snippets files
 */
function findSnippetFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files

    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
            findSnippetFiles(fullPath, files)
        } else if (item.name.endsWith('.code-snippets')) {
            files.push(fullPath)
        }
    }

    return files
}

/**
 * Get category name from file path
 */
function getCategoryFromPath(filePath) {
    const relativePath = path.relative(snippetsDir, filePath)
    const parts = relativePath.split(path.sep)

    // Use first directory as category, or filename without extension
    if (parts.length > 1) {
        return parts[0]
    }
    return path.basename(filePath, '.code-snippets')
}

/**
 * Parse JSONC (JSON with comments and trailing commas)
 */
function parseJsonc(content) {
    // Remove single-line comments
    let cleaned = content.replace(/\/\/.*$/gm, '')
    // Remove multi-line comments
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove trailing commas before } or ]
    cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1')

    return JSON.parse(cleaned)
}

/**
 * Merge ALL snippets into a single object
 */
function mergeAllSnippets() {
    const snippetFiles = findSnippetFiles(snippetsDir)
    const allSnippets = {}
    const categoryStats = new Map()

    for (const file of snippetFiles) {
        const category = getCategoryFromPath(file)
        const content = fs.readFileSync(file, 'utf-8')

        try {
            const snippets = parseJsonc(content)
            const count = Object.keys(snippets).length

            // Track stats per category
            if (!categoryStats.has(category)) {
                categoryStats.set(category, 0)
            }
            categoryStats.set(category, categoryStats.get(category) + count)

            // Merge all snippets into single object
            Object.assign(allSnippets, snippets)
        } catch (e) {
            console.error(`Error parsing ${file}: ${e.message}`)
        }
    }

    return { allSnippets, categoryStats }
}

/**
 * Write single merged snippets file to .vscode
 */
function writeSnippets(allSnippets) {
    // Ensure .vscode directory exists
    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir, { recursive: true })
    }

    // Remove old snippet files
    const existingFiles = fs.readdirSync(vscodeDir).filter((f) => f.endsWith('.code-snippets'))
    for (const file of existingFiles) {
        fs.unlinkSync(path.join(vscodeDir, file))
    }

    // Write single file
    const fileName = 'project.code-snippets'
    const filePath = path.join(vscodeDir, fileName)
    fs.writeFileSync(filePath, JSON.stringify(allSnippets, null, 4))

    return { fileName, count: Object.keys(allSnippets).length }
}

/**
 * Find all README.md files in .snippets subdirectories
 */
function findReadmeFiles() {
    const readmeFiles = []

    if (!fs.existsSync(snippetsDir)) return readmeFiles

    const items = fs.readdirSync(snippetsDir, { withFileTypes: true })

    for (const item of items) {
        if (item.isDirectory()) {
            const readmePath = path.join(snippetsDir, item.name, 'README.md')
            if (fs.existsSync(readmePath)) {
                readmeFiles.push({
                    category: item.name,
                    sourcePath: readmePath,
                })
            }
        }
    }

    return readmeFiles
}

/**
 * Copy README files to .docs/snippets/ with updated links
 */
function copyReadmeToDocs(readmeFiles) {
    // Ensure .docs/snippets directory exists
    if (!fs.existsSync(docsSnippetsDir)) {
        fs.mkdirSync(docsSnippetsDir, { recursive: true })
    }

    // Remove old files
    if (fs.existsSync(docsSnippetsDir)) {
        const existingFiles = fs.readdirSync(docsSnippetsDir)
        for (const file of existingFiles) {
            const filePath = path.join(docsSnippetsDir, file)
            fs.unlinkSync(filePath)
        }
    }

    const copied = []

    for (const { category, sourcePath } of readmeFiles) {
        const targetName = `${category}.md`
        const targetPath = path.join(docsSnippetsDir, targetName)

        try {
            // Read content and update relative links
            let content = fs.readFileSync(sourcePath, 'utf-8')
            // Update links: ./file.code-snippets -> ../../.snippets/category/file.code-snippets
            content = content.replace(/\(\.\/([^)]+\.code-snippets)\)/g, `(../../.snippets/${category}/$1)`)
            fs.writeFileSync(targetPath, content)
            copied.push({ category, targetName })
        } catch (e) {
            console.error(`Error copying ${category}: ${e.message}`)
        }
    }

    return copied
}

/**
 * Main function
 */
function main() {
    console.log(`${colors.blue}🔄 Syncing snippets...${colors.reset}\n`)

    if (!fs.existsSync(snippetsDir)) {
        console.error('❌ .snippets folder not found!')
        console.log('Run `pnpm gen:snippets` first to generate snippets.')
        process.exit(1)
    }

    // Merge and write snippets
    const { allSnippets, categoryStats } = mergeAllSnippets()
    const { fileName, count } = writeSnippets(allSnippets)

    console.log(`${colors.green}✅ Snippets synced to .vscode/${fileName}${colors.reset}\n`)
    console.log('📁 Categories:')

    for (const [category, snippetCount] of [...categoryStats.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        console.log(`   ${colors.yellow}${category}${colors.reset} (${snippetCount} snippets)`)
    }

    console.log(`\n${colors.green}📊 Total: ${count} snippets in single file${colors.reset}`)

    // Copy README files to docs
    const readmeFiles = findReadmeFiles()
    const copied = copyReadmeToDocs(readmeFiles)

    if (copied.length > 0) {
        console.log(`\n${colors.cyan}� Docs copied to .docs/snippets/:${colors.reset}`)
        for (const { category, targetName } of copied.sort((a, b) => a.category.localeCompare(b.category))) {
            console.log(`   ${colors.yellow}${targetName}${colors.reset}`)
        }
    }
}

main()
