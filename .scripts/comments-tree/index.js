#!/usr/bin/env node

/**
 * Generate Comments Tree
 * Scans TSX/JSX files, extracts comments with line numbers,
 * and generates a Markdown file with folder-based nested list structure
 * with VSCode file links.
 *
 * Usage:
 *   pnpm comments:tree          - Interactive mode
 *   pnpm comments:tree --silent - Use default config
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..', '..')

// ============================================================
// CONFIGURATION - Modify these variables as needed
// ============================================================
const CONFIG = {
    // Multiple source folders to scan (relative to root)
    // Each folder generates its own .md file
    // Example: ['src/pages/shadcn', 'src/pages/react', 'src/components']
    sourceFolders: ['src'],

    // Output folder for the markdown files (relative to root)
    outputFolder: '.docs',

    // Output filename pattern (use {folder} as placeholder)
    // Examples:
    //   'comments-{folder}.md' → comments-pages.md, comments-components.md
    //   'comments-tree.md' → single file name for all
    outputFilePattern: 'comments-{folder}.md',

    // File extensions to scan
    fileExtensions: ['.tsx', '.jsx'],

    // Folders to exclude from scanning
    excludeFolders: ['node_modules', '.git', 'dist', 'build'],

    // Nesting level for the markdown list
    // 1 = pages level (nested folders are flat)
    // 2 = one level deeper
    // 0 = completely flat
    // -1 = unlimited nesting
    nestingLevel: 1,

    // Include file name in the list
    includeFileName: true,

    // Comment patterns to extract
    commentPatterns: {
        // Single line comments: // comment
        singleLine: /\/\/\s*(.+)/g,
        // Multi-line comments: /* comment */ or /** comment */
        multiLine: /\/\*\*?\s*([\s\S]*?)\s*\*\//g,
        // JSX comments: {/* comment */}
        jsxComment: /\{\/\*\s*([\s\S]*?)\s*\*\/\}/g,
    },

    // Filter comments - only include comments matching these patterns (empty = include all)
    // Example: [/TODO/i, /FIXME/i, /NOTE/i]
    // Examples:
    //   [/TODO/i, /FIXME/i] - শুধু TODO এবং FIXME comments
    //   [/Section/i] - শুধু Section comments
    //   [/^#/] - যেগুলো # দিয়ে শুরু
    filterPatterns: [],

    // Exclude comments matching these patterns
    excludePatterns: [/eslint-disable/i, /prettier-ignore/i, /^@/],

    // Interactive mode - ask user for config
    interactive: true,

    // ============================================================
    // OUTPUT FORMAT CUSTOMIZATION
    // ============================================================
    format: {
        // Comment item format template
        // Available placeholders:
        //   {line}     - Line number
        //   {column}   - Column number
        //   {text}     - Comment text
        //   {link}     - VSCode file link
        //   {file}     - File name only
        //   {path}     - Relative path from source folder
        // Examples:
        //   '[L{line}]({link}): {text}'           → [L42](vscode://...): Comment text
        //   '`{file}:{line}` - {text}'            → `file.tsx:42` - Comment text
        //   '- [{text}]({link})'                  → - [Comment text](vscode://...)
        //   '**L{line}**: {text} [→]({link})'    → **L42**: Comment text [→](vscode://...)
        commentFormat: '[L{line}]({link}): {text}',

        // File header format (when includeFileName is true)
        // Available placeholders: {file}, {path}, {count}
        fileFormat: '**{file}**',

        // Folder format
        // Available placeholders: {folder}, {count}
        folderFormat: '📁 **{folder}/**',

        // Show line numbers as links or plain text
        lineAsLink: true,

        // Show comment count next to files/folders
        showCounts: false,

        // Truncate long comments (0 = no truncation)
        maxCommentLength: 0,

        // Group comments by type (TODO, FIXME, NOTE, etc.)
        groupByType: false,

        // Comment type patterns for grouping
        commentTypes: {
            TODO: /^TODO:?\s*/i,
            FIXME: /^FIXME:?\s*/i,
            NOTE: /^NOTE:?\s*/i,
            HACK: /^HACK:?\s*/i,
            BUG: /^BUG:?\s*/i,
            REVIEW: /^REVIEW:?\s*/i,
        },

        // Icon for each comment type (when groupByType is true)
        typeIcons: {
            TODO: '📌',
            FIXME: '🔧',
            NOTE: '📝',
            HACK: '⚡',
            BUG: '🐛',
            REVIEW: '👀',
            OTHER: '💬',
        },

        // Date format for header (null = ISO format)
        // Options: 'short', 'long', 'iso', or custom strftime-like string
        dateFormat: 'iso',

        // Add table of contents
        includeTOC: false,

        // Output in table format instead of list
        tableFormat: false,
    },
}
// ============================================================

// Resolved paths
const outputDir = path.join(rootDir, CONFIG.outputFolder)

// Colors for terminal output
const colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
    dim: '\x1b[2m',
    bold: '\x1b[1m',
}

/**
 * Create readline interface for user input
 */
function createReadline() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
}

/**
 * Ask user a question and get input
 */
function ask(rl, question, defaultValue = '') {
    const defaultText = defaultValue ? ` ${colors.dim}(${defaultValue})${colors.reset}` : ''
    return new Promise((resolve) => {
        rl.question(`${colors.cyan}?${colors.reset} ${question}${defaultText}: `, (answer) => {
            resolve(answer.trim() || defaultValue)
        })
    })
}

/**
 * Ask yes/no question
 */
function askYesNo(rl, question, defaultValue = false) {
    const defaultText = defaultValue ? 'Y/n' : 'y/N'
    return new Promise((resolve) => {
        rl.question(`${colors.cyan}?${colors.reset} ${question} ${colors.dim}(${defaultText})${colors.reset}: `, (answer) => {
            if (!answer.trim()) {
                resolve(defaultValue)
            } else {
                resolve(answer.toLowerCase().startsWith('y'))
            }
        })
    })
}

/**
 * Interactive configuration
 */
async function interactiveConfig() {
    const rl = createReadline()

    console.log(`\n${colors.bold}${colors.cyan}📝 Comments Tree Generator - Configuration${colors.reset}\n`)
    console.log(`${colors.dim}Press Enter to use default values${colors.reset}\n`)

    try {
        // Source folders
        const defaultFolders = CONFIG.sourceFolders.join(', ')
        const foldersInput = await ask(rl, `Source folders ${colors.dim}(comma-separated)${colors.reset}`, defaultFolders)
        const sourceFolders = foldersInput
            .split(',')
            .map((f) => f.trim())
            .filter(Boolean)

        // Nesting level
        const nestingInput = await ask(rl, `Nesting level ${colors.dim}(-1=unlimited, 0=flat, 1=pages, 2=deeper)${colors.reset}`, String(CONFIG.nestingLevel))
        const nestingLevel = parseInt(nestingInput, 10)

        // Filter patterns
        const filterInput = await ask(rl, `Filter patterns ${colors.dim}(e.g., TODO,FIXME,Section - empty=all)${colors.reset}`, '')
        const filterPatterns = filterInput ? filterInput.split(',').map((p) => new RegExp(p.trim(), 'i')) : []

        // Output pattern
        const outputPattern = await ask(rl, `Output file pattern`, CONFIG.outputFilePattern)

        // Format options
        console.log(`\n${colors.yellow}─── Format Options ───${colors.reset}\n`)

        // Comment format
        console.log(`${colors.dim}Comment format placeholders: {line}, {text}, {link}, {file}, {path}, {icon}${colors.reset}`)
        const commentFormat = await ask(rl, `Comment format`, CONFIG.format.commentFormat)

        // Table format
        const tableFormat = await askYesNo(rl, `Use table format instead of list?`, CONFIG.format.tableFormat)

        // Group by type
        const groupByType = await askYesNo(rl, `Group comments by type (TODO, FIXME, etc.)?`, CONFIG.format.groupByType)

        // Show counts
        const showCounts = await askYesNo(rl, `Show comment counts next to files/folders?`, CONFIG.format.showCounts)

        // Max comment length
        const maxLengthInput = await ask(rl, `Max comment length ${colors.dim}(0=no limit)${colors.reset}`, String(CONFIG.format.maxCommentLength))
        const maxCommentLength = parseInt(maxLengthInput, 10)

        rl.close()

        return {
            ...CONFIG,
            sourceFolders,
            nestingLevel,
            filterPatterns,
            outputFilePattern: outputPattern,
            format: {
                ...CONFIG.format,
                commentFormat,
                tableFormat,
                groupByType,
                showCounts,
                maxCommentLength,
            },
        }
    } catch (error) {
        rl.close()
        throw error
    }
}

/**
 * Recursively get all files with specified extensions
 */
function getFiles(dir, extensions, excludeFolders = []) {
    const files = []

    if (!fs.existsSync(dir)) {
        return files
    }

    function scan(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name)

            if (entry.isDirectory()) {
                if (!excludeFolders.includes(entry.name)) {
                    scan(fullPath)
                }
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase()
                if (extensions.includes(ext)) {
                    files.push(fullPath)
                }
            }
        }
    }

    scan(dir)
    return files
}

/**
 * Extract comments from file content with line numbers
 */
function extractComments(content, filePath, config) {
    const comments = []
    const lines = content.split('\n')

    // Track already found comments to avoid duplicates
    const foundComments = new Set()

    // Helper to add comment if not duplicate
    function addComment(text, lineNumber, column = 1) {
        const cleanText = text.trim().replace(/\s+/g, ' ')
        if (!cleanText) return

        // Check filter patterns
        if (config.filterPatterns.length > 0) {
            const matches = config.filterPatterns.some((pattern) => pattern.test(cleanText))
            if (!matches) return
        }

        // Check exclude patterns
        if (config.excludePatterns.some((pattern) => pattern.test(cleanText))) {
            return
        }

        const key = `${lineNumber}:${cleanText}`
        if (foundComments.has(key)) return
        foundComments.add(key)

        comments.push({
            text: cleanText,
            line: lineNumber,
            column,
            filePath,
        })
    }

    // Process line by line for accurate line numbers
    lines.forEach((line, index) => {
        const lineNumber = index + 1

        // Single line comments
        const singleLineMatch = line.match(/\/\/\s*(.+)/)
        if (singleLineMatch) {
            const column = line.indexOf('//') + 1
            addComment(singleLineMatch[1], lineNumber, column)
        }

        // JSX comments on single line
        const jsxMatch = line.match(/\{\/\*\s*(.+?)\s*\*\/\}/)
        if (jsxMatch) {
            const column = line.indexOf('{/*') + 1
            addComment(jsxMatch[1], lineNumber, column)
        }
    })

    // Multi-line comments (need to track across lines)
    let multiLineRegex = /\/\*\*?\s*([\s\S]*?)\s*\*\//g
    let match

    while ((match = multiLineRegex.exec(content)) !== null) {
        const commentText = match[1]
        const beforeMatch = content.substring(0, match.index)
        const lineNumber = beforeMatch.split('\n').length
        const lastNewline = beforeMatch.lastIndexOf('\n')
        const column = match.index - lastNewline

        // Clean up multi-line comment text
        const cleanText = commentText
            .split('\n')
            .map((line) => line.replace(/^\s*\*\s?/, '').trim())
            .filter((line) => line)
            .join(' ')

        addComment(cleanText, lineNumber, column)
    }

    return comments.sort((a, b) => a.line - b.line)
}

/**
 * Build folder tree structure from files
 */
function buildFolderTree(files, baseDir) {
    const tree = {}

    for (const file of files) {
        const relativePath = path.relative(baseDir, file)
        const parts = relativePath.split(path.sep)
        let current = tree

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i]
            const isFile = i === parts.length - 1

            if (!current[part]) {
                current[part] = isFile ? { _isFile: true, _path: file, _comments: [] } : {}
            }
            current = current[part]
        }
    }

    return tree
}

/**
 * Generate VSCode file link with proper encoding for special characters
 */
function generateVSCodeLink(filePath, line, column = 1) {
    // Encode special characters in the path (spaces, unicode, etc.)
    // But keep forward slashes and colons for the URI structure
    const encodedPath = filePath
        .split('/')
        .map((part) => encodeURIComponent(part))
        .join('/')
    return `vscode://file/${encodedPath}:${line}:${column}`
}

/**
 * Format a comment using the template
 */
function formatComment(comment, config, sourceDir) {
    const { format } = config
    const link = generateVSCodeLink(comment.filePath, comment.line, comment.column)
    const fileName = path.basename(comment.filePath)
    const relativePath = path.relative(sourceDir, comment.filePath)

    // Truncate if needed
    let text = comment.text
    if (format.maxCommentLength > 0 && text.length > format.maxCommentLength) {
        text = text.substring(0, format.maxCommentLength) + '...'
    }

    // Detect comment type
    let type = 'OTHER'
    let cleanText = text
    if (format.groupByType) {
        for (const [typeName, pattern] of Object.entries(format.commentTypes)) {
            if (pattern.test(text)) {
                type = typeName
                cleanText = text.replace(pattern, '').trim()
                break
            }
        }
    }

    // Apply format template
    let formatted = format.commentFormat
        .replace(/\{line\}/g, comment.line)
        .replace(/\{column\}/g, comment.column)
        .replace(/\{text\}/g, format.groupByType ? cleanText : text)
        .replace(/\{link\}/g, link)
        .replace(/\{file\}/g, fileName)
        .replace(/\{path\}/g, relativePath)
        .replace(/\{type\}/g, type)
        .replace(/\{icon\}/g, format.typeIcons[type] || format.typeIcons.OTHER)

    return { formatted, type }
}

/**
 * Format file header
 */
function formatFileHeader(fileName, commentCount, config) {
    const { format } = config
    let header = format.fileFormat.replace(/\{file\}/g, fileName).replace(/\{count\}/g, commentCount)

    if (format.showCounts && commentCount > 0) {
        header += ` (${commentCount})`
    }

    return header
}

/**
 * Format folder header
 */
function formatFolderHeader(folderName, commentCount, config) {
    const { format } = config
    let header = format.folderFormat.replace(/\{folder\}/g, folderName).replace(/\{count\}/g, commentCount)

    if (format.showCounts && commentCount > 0) {
        header += ` (${commentCount})`
    }

    return header
}

/**
 * Count comments in a subtree
 */
function countCommentsInTree(node) {
    let count = 0
    for (const value of Object.values(node)) {
        if (value._isFile) {
            count += (value._comments || []).length
        } else if (typeof value === 'object') {
            count += countCommentsInTree(value)
        }
    }
    return count
}

/**
 * Generate markdown list from tree
 */
function generateMarkdown(tree, config, sourceDir, level = 0, maxLevel = config.nestingLevel) {
    let markdown = ''
    const indent = '  '.repeat(level)

    // Separate folders and files
    const entries = Object.entries(tree)
    const folders = entries.filter(([, value]) => !value._isFile && typeof value === 'object')
    const files = entries.filter(([, value]) => value._isFile)

    // Sort folders first, then files
    const sortedEntries = [...folders.sort(), ...files.sort()]

    for (const [name, value] of sortedEntries) {
        if (value._isFile) {
            // It's a file
            const comments = value._comments || []

            if (comments.length > 0) {
                if (config.includeFileName) {
                    const shouldNest = maxLevel === -1 || level < maxLevel
                    const fileIndent = shouldNest ? indent : '  '.repeat(Math.min(level, maxLevel))

                    const fileHeader = formatFileHeader(name, comments.length, config)
                    markdown += `${fileIndent}- ${fileHeader}\n`

                    // Group by type if enabled
                    if (config.format.groupByType) {
                        const grouped = {}
                        for (const comment of comments) {
                            const { formatted, type } = formatComment(comment, config, sourceDir)
                            if (!grouped[type]) grouped[type] = []
                            grouped[type].push(formatted)
                        }

                        const commentIndent = shouldNest ? '  '.repeat(level + 1) : '  '.repeat(Math.min(level, maxLevel) + 1)
                        for (const [type, items] of Object.entries(grouped)) {
                            const icon = config.format.typeIcons[type] || config.format.typeIcons.OTHER
                            markdown += `${commentIndent}- ${icon} **${type}**\n`
                            for (const item of items) {
                                markdown += `${commentIndent}  - ${item}\n`
                            }
                        }
                    } else {
                        // Add comments normally
                        for (const comment of comments) {
                            const { formatted } = formatComment(comment, config, sourceDir)
                            const commentIndent = shouldNest ? '  '.repeat(level + 1) : '  '.repeat(Math.min(level, maxLevel) + 1)
                            markdown += `${commentIndent}- ${formatted}\n`
                        }
                    }
                } else {
                    // Just list comments without file grouping
                    for (const comment of comments) {
                        const { formatted } = formatComment(comment, config, sourceDir)
                        markdown += `${indent}- ${formatted}\n`
                    }
                }
            }
        } else {
            // It's a folder
            const shouldNest = maxLevel === -1 || level < maxLevel
            const folderCommentCount = countCommentsInTree(value)

            const folderHeader = formatFolderHeader(name, folderCommentCount, config)

            if (shouldNest) {
                markdown += `${indent}- ${folderHeader}\n`
                markdown += generateMarkdown(value, config, sourceDir, level + 1, maxLevel)
            } else {
                // Flatten - add folder name as prefix
                markdown += `${indent}- ${folderHeader}\n`
                markdown += generateMarkdown(value, config, sourceDir, level + 1, level) // Keep same visual level
            }
        }
    }

    return markdown
}

/**
 * Generate table format output
 */
function generateTable(tree, config, sourceDir) {
    let markdown = '| File | Line | Comment |\n'
    markdown += '|------|------|----------|\n'

    function traverse(node, prefix = '') {
        for (const [name, value] of Object.entries(node)) {
            if (value._isFile) {
                const comments = value._comments || []
                for (const comment of comments) {
                    const link = generateVSCodeLink(comment.filePath, comment.line, comment.column)
                    const relativePath = path.relative(sourceDir, comment.filePath)
                    let text = comment.text
                    if (config.format.maxCommentLength > 0 && text.length > config.format.maxCommentLength) {
                        text = text.substring(0, config.format.maxCommentLength) + '...'
                    }
                    markdown += `| ${relativePath} | [${comment.line}](${link}) | ${text} |\n`
                }
            } else if (typeof value === 'object') {
                traverse(value, prefix + name + '/')
            }
        }
    }

    traverse(tree)
    return markdown
}

/**
 * Count total comments and files
 */
function countStats(tree) {
    let files = 0
    let comments = 0

    function traverse(node) {
        for (const value of Object.values(node)) {
            if (value._isFile) {
                files++
                comments += (value._comments || []).length
            } else {
                traverse(value)
            }
        }
    }

    traverse(tree)
    return { files, comments }
}

/**
 * Process a single source folder
 */
function processFolder(sourceFolder, config) {
    const sourceDir = path.join(rootDir, sourceFolder)

    // Generate output filename
    const folderName = sourceFolder.split('/').pop() || sourceFolder.replace(/\//g, '-')
    const outputFileName = config.outputFilePattern.replace('{folder}', folderName)
    const outputFile = path.join(outputDir, outputFileName)

    console.log(`\n${colors.blue}📂 Processing:${colors.reset} ${sourceFolder}`)

    if (!fs.existsSync(sourceDir)) {
        console.log(`${colors.yellow}   ⚠️  Folder not found, skipping${colors.reset}`)
        return null
    }

    // Get all matching files
    const files = getFiles(sourceDir, config.fileExtensions, config.excludeFolders)
    console.log(`${colors.dim}   Found ${files.length} files${colors.reset}`)

    if (files.length === 0) {
        console.log(`${colors.dim}   No matching files found${colors.reset}`)
        return null
    }

    // Build folder tree
    const tree = buildFolderTree(files, sourceDir)

    // Extract comments for each file
    let totalComments = 0
    function processTree(node) {
        for (const [key, value] of Object.entries(node)) {
            if (value._isFile) {
                const content = fs.readFileSync(value._path, 'utf-8')
                const comments = extractComments(content, value._path, config)
                value._comments = comments
                totalComments += comments.length

                if (comments.length > 0) {
                    console.log(`${colors.dim}   📄 ${path.relative(sourceDir, value._path)}: ${comments.length} comments${colors.reset}`)
                }
            } else {
                processTree(value)
            }
        }
    }

    processTree(tree)

    // Generate markdown
    const stats = countStats(tree)

    // Format timestamp based on config
    let timestamp
    switch (config.format?.dateFormat || 'iso') {
        case 'short':
            timestamp = new Date().toLocaleDateString()
            break
        case 'long':
            timestamp = new Date().toLocaleString()
            break
        default:
            timestamp = new Date().toISOString()
    }

    let markdown = `# Comments Tree: ${folderName}\n\n`
    markdown += `> Auto-generated on ${timestamp}\n`
    markdown += `> Source: \`${sourceFolder}/\`\n`
    markdown += `> Files scanned: ${stats.files} | Comments found: ${stats.comments}\n`
    if (config.filterPatterns.length > 0) {
        const patterns = config.filterPatterns.map((p) => p.source).join(', ')
        markdown += `> Filter: ${patterns}\n`
    }
    markdown += `\n---\n\n`

    // Generate content based on format
    if (config.format?.tableFormat) {
        markdown += generateTable(tree, config, sourceDir)
    } else {
        markdown += generateMarkdown(tree, config, sourceDir)
    }

    // Write output file
    fs.writeFileSync(outputFile, markdown, 'utf-8')

    console.log(`${colors.green}   ✅ Generated:${colors.reset} ${path.relative(rootDir, outputFile)}`)
    console.log(`${colors.dim}   ${stats.files} files, ${stats.comments} comments${colors.reset}`)

    return { outputFile, stats }
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2)
    const isSilent = args.includes('--silent') || args.includes('-s')

    console.log(`\n${colors.bold}${colors.cyan}📝 Generate Comments Tree${colors.reset}\n`)

    // Get configuration
    let config = { ...CONFIG }

    if (config.interactive && !isSilent) {
        try {
            config = await interactiveConfig()
        } catch (error) {
            console.log(`\n${colors.dim}Using default configuration...${colors.reset}`)
        }
    }

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    console.log(`\n${colors.magenta}━━━ Processing ${config.sourceFolders.length} folder(s) ━━━${colors.reset}`)

    // Process each source folder
    const results = []
    for (const folder of config.sourceFolders) {
        const result = processFolder(folder, config)
        if (result) {
            results.push(result)
        }
    }

    // Summary
    console.log(`\n${colors.magenta}━━━ Summary ━━━${colors.reset}`)
    const totalFiles = results.reduce((sum, r) => sum + r.stats.files, 0)
    const totalComments = results.reduce((sum, r) => sum + r.stats.comments, 0)
    console.log(`${colors.green}✅ Generated ${results.length} file(s)${colors.reset}`)
    console.log(`${colors.dim}   Total: ${totalFiles} files scanned, ${totalComments} comments found${colors.reset}\n`)
}

// Run
main().catch((err) => {
    console.error(`${colors.red}❌ Error:${colors.reset}`, err.message)
    process.exit(1)
})
