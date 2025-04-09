#!/usr/bin/env node

/** Load package.json */
import packageJson from '../package.json' with { type: 'json' };

/** Load environments */
import path from 'node:path';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import { fileURLToPath } from 'node:url';
import { loadConfig } from '../config.interface.js';

const _ENV_FILE = fileURLToPath(import.meta.url);
const _ENV_DIR = path.dirname(_ENV_FILE);
const _ENV_PATH = path.join(_ENV_DIR, '..', '.env');

expand({ parsed: dotenv.config({ path: _ENV_PATH }).parsed });
loadConfig();

import { Command } from 'commander';
import { Chalk } from 'chalk';
import figlet from 'figlet';
import { myCmds } from '../commands/index.js';

console.log(new Chalk().yellow(figlet.textSync(packageJson.name, { horizontalLayout: 'full' })));

// Initial program
const pgm = new Command()
    .version(packageJson.version)
    .name(packageJson.name)
    .alias('mycli')
    .usage('<command> arguments [options')
    .description('A simple CLI tool sample')

// Add commands
myCmds.forEach((x) => pgm.addCommand(x));

pgm.parse(process.argv);
