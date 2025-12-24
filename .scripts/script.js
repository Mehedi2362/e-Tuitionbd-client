#!/usr/bin/env node

/**
 * Script Runner CLI
 * A unified interface to run various project scripts with configuration
 *
 * Usage:
 *   node .scripts/script.js              # Interactive - shows all scripts
 *   node .scripts/script.js <script>     # Run specific script
 *   pnpm scripts                         # Same as above
 *
 * Auto-discovers scripts from .scripts/ folder structure:
 *   .scripts/
 *     script-name/
 *       index.js     (required - main script)
 *       README.md    (optional - manual/docs)
 *       config.json  (optional - default config)
 */

import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

// ============================================================
// CONFIGURATION
// ============================================================
const CONFIG = {
    // Scripts folder (relative to root)
    scriptsFolder: '.scripts',

    // Entry file name for each script
    entryFile: 'index.js',

    // Optional config file for each script
    configFile: 'config.json',

    // Optional readme file for each script
    readmeFile: 'README.md',

    // Files/folders to ignore when discovering scripts
    ignore: ['node_modules', '.git', 'script.js'],

    // Default script metadata (for scripts without package.json)
    defaultMeta: {
        icon: '�',
        category: 'General',
    },
}
// ============================================================

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
 * Discover all available scripts from folder structure
 */
function discoverScripts() {
    const scriptsDir = path.join(rootDir, CONFIG.scriptsFolder)
    const scripts = {}

    if (!fs.existsSync(scriptsDir)) {
        return scripts
    }

    const entries = fs.readdirSync(scriptsDir, { withFileTypes: true })

    for (const entry of entries) {
        if (!entry.isDirectory()) continue
        if (CONFIG.ignore.includes(entry.name)) continue

        const scriptDir = path.join(scriptsDir, entry.name)
        const entryPath = path.join(scriptDir, CONFIG.entryFile)

        // Check if index.js exists
        if (!fs.existsSync(entryPath)) continue

        // Load metadata
        const meta = loadScriptMeta(scriptDir, entry.name)

        scripts[entry.name] = {
            name: meta.name || formatName(entry.name),
            description: meta.description || 'No description available',
            script: path.join(entry.name, CONFIG.entryFile),
            folder: entry.name,
            icon: meta.icon || CONFIG.defaultMeta.icon,
            category: meta.category || CONFIG.defaultMeta.category,
            hasReadme: fs.existsSync(path.join(scriptDir, CONFIG.readmeFile)),
            hasConfig: fs.existsSync(path.join(scriptDir, CONFIG.configFile)),
        }
    }

    return scripts
}

/**
 * Load script metadata from package.json or config.json
 */
function loadScriptMeta(scriptDir, folderName) {
    // Try config.json first
    const configPath = path.join(scriptDir, CONFIG.configFile)
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
            return config.meta || config
        } catch {
            // Ignore parse errors
        }
    }

    // Try reading first comment from index.js
    const indexPath = path.join(scriptDir, CONFIG.entryFile)
    if (fs.existsSync(indexPath)) {
        try {
            const content = fs.readFileSync(indexPath, 'utf-8')
            const match = content.match(/\/\*\*?\s*\n\s*\*?\s*(.+?)(?:\n|$)/)
            if (match) {
                return { description: match[1].trim() }
            }
        } catch {
            // Ignore read errors
        }
    }

    return {}
}

/**
 * Format folder name to display name
 */
function formatName(folderName) {
    return folderName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

/**
 * Create readline interface
 */
function createReadline() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
}

/**
 * Ask user a question
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
 * Display header
 */
function showHeader() {
    console.log(`
${colors.bold}${colors.cyan}╔═══════════════════════════════════════════╗
║           🛠️  Script Runner CLI            ║
╚═══════════════════════════════════════════╝${colors.reset}
`)
}

/**
 * Display available scripts
 */
function showScripts(scripts) {
    console.log(`${colors.yellow}Available Scripts:${colors.reset}\n`)

    if (Object.keys(scripts).length === 0) {
        console.log(`${colors.dim}  No scripts found. Create a folder in .scripts/ with an index.js file.${colors.reset}\n`)
        return {}
    }

    // Group by category
    const categories = {}
    for (const [key, script] of Object.entries(scripts)) {
        const cat = script.category || 'Other'
        if (!categories[cat]) categories[cat] = []
        categories[cat].push({ key, ...script })
    }

    let index = 1
    const indexMap = {}

    for (const [category, categoryScripts] of Object.entries(categories)) {
        console.log(`${colors.dim}─── ${category} ───${colors.reset}`)
        for (const script of categoryScripts) {
            indexMap[index] = script.key
            console.log(`  ${colors.green}${index}.${colors.reset} ${script.icon} ${colors.bold}${script.name}${colors.reset}`)
            console.log(`     ${colors.dim}${script.description}${colors.reset}`)
            if (script.hasReadme) {
                console.log(`     ${colors.dim}📖 Has documentation${colors.reset}`)
            }
            index++
        }
        console.log()
    }

    return indexMap
}

/**
 * Display manual/readme for a script
 */
function showManual(scripts, scriptKey) {
    const script = scripts[scriptKey]
    if (!script) {
        console.log(`${colors.red}Script not found: ${scriptKey}${colors.reset}`)
        return
    }

    const readmePath = path.join(__dirname, script.folder, CONFIG.readmeFile)

    console.log(`
${colors.bold}${colors.cyan}═══ ${script.icon} ${script.name} ═══${colors.reset}

${colors.yellow}Description:${colors.reset}
  ${script.description}

${colors.yellow}Location:${colors.reset}
  .scripts/${script.folder}/

${colors.yellow}Usage:${colors.reset}
  ${colors.dim}# Interactive mode${colors.reset}
  pnpm scripts ${scriptKey}

  ${colors.dim}# Silent mode (use defaults)${colors.reset}
  pnpm scripts ${scriptKey} --silent
`)

    // Show README content if exists
    if (fs.existsSync(readmePath)) {
        console.log(`${colors.yellow}Documentation:${colors.reset}`)
        const readme = fs.readFileSync(readmePath, 'utf-8')
        console.log(`${colors.dim}${readme}${colors.reset}`)
    }
}

/**
 * Run a script
 */
function runScript(scripts, scriptKey, args = []) {
    const script = scripts[scriptKey]
    if (!script) {
        console.log(`${colors.red}Script not found: ${scriptKey}${colors.reset}`)
        return
    }

    const scriptPath = path.join(__dirname, script.script)

    if (!fs.existsSync(scriptPath)) {
        console.log(`${colors.red}Script file not found: ${scriptPath}${colors.reset}`)
        return
    }

    console.log(`\n${colors.magenta}Running ${script.icon} ${script.name}...${colors.reset}\n`)

    // Spawn the script as a child process
    const child = spawn('node', [scriptPath, ...args], {
        cwd: rootDir,
        stdio: 'inherit',
    })

    child.on('error', (err) => {
        console.error(`${colors.red}Error running script: ${err.message}${colors.reset}`)
    })

    child.on('exit', (code) => {
        if (code !== 0 && code !== null) {
            console.log(`\n${colors.red}Script exited with code ${code}${colors.reset}`)
        }
    })
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2)

    // Discover available scripts
    const scripts = discoverScripts()

    // Check for help flag
    if (args.includes('--help') || args.includes('-h')) {
        showHeader()
        console.log(`${colors.yellow}Usage:${colors.reset}
  pnpm scripts                    ${colors.dim}# Interactive mode${colors.reset}
  pnpm scripts <script>           ${colors.dim}# Run specific script${colors.reset}
  pnpm scripts <script> -h        ${colors.dim}# Show script manual${colors.reset}
  pnpm scripts <script> --silent  ${colors.dim}# Run with default config${colors.reset}

${colors.yellow}Creating a new script:${colors.reset}
  1. Create a folder in .scripts/ (e.g., .scripts/my-script/)
  2. Add an index.js file with your script logic
  3. Optionally add README.md for documentation
  4. Optionally add config.json for metadata:
     ${colors.dim}{ "name": "My Script", "description": "...", "icon": "🚀", "category": "Tools" }${colors.reset}
`)
        showScripts(scripts)
        return
    }

    // If script name provided
    if (args.length > 0) {
        const scriptKey = args[0]

        // Check if it's a valid script
        if (!scripts[scriptKey]) {
            console.log(`${colors.red}Unknown script: ${scriptKey}${colors.reset}\n`)
            console.log(`${colors.dim}Available scripts:${colors.reset}`)
            for (const key of Object.keys(scripts)) {
                console.log(`  - ${key}`)
            }
            return
        }

        // Show manual if -h flag after script name
        if (args.slice(1).includes('-h') || args.slice(1).includes('--help')) {
            showManual(scripts, scriptKey)
            return
        }

        // Run the script
        runScript(scripts, scriptKey, args.slice(1))
        return
    }

    // Interactive mode
    showHeader()
    const indexMap = showScripts(scripts)

    if (Object.keys(scripts).length === 0) {
        return
    }

    const rl = createReadline()

    try {
        const choice = await ask(rl, 'Select a script (number or name)', '1')
        rl.close()

        // Parse choice
        let scriptKey
        if (/^\d+$/.test(choice)) {
            scriptKey = indexMap[parseInt(choice, 10)]
        } else {
            scriptKey = choice
        }

        if (!scriptKey || !scripts[scriptKey]) {
            console.log(`${colors.red}Invalid selection${colors.reset}`)
            return
        }

        // Run the selected script
        runScript(scripts, scriptKey)
    } catch (error) {
        rl.close()
        console.error(`${colors.red}Error: ${error.message}${colors.reset}`)
    }
}

// Run
main()
