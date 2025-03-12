import { Command, Option } from 'commander';
import { CustomValidator, CustomDefinition } from '@xxxhand/app-common';
import { getConf } from '../config.interface.js';

/**
 * @typedef {object} IMyOption
 * @property {string} name
 * @property {string} date
 */

const _ACCEPT_ACTIONS = ['print', 'smile'];
const _CMD_NAME = 'my';

/**
 * @description Command handler
 * @param {'print'|'smile'} action 
 * @param {IMyOption} opt
 * @returns {Promise<void>}
 */
async function cmdHanlder(action, opt) {
    new CustomValidator()
        .checkThrows(action, { m: `Action ${action} not accepted.`, fn: (val) => _ACCEPT_ACTIONS.includes(val) })
        .checkThrows(opt.name, { s: CustomDefinition.validateStrategy.NON_EMPTY_STRING, m: 'You must input a name' })
        .checkThrows(opt.date, { s: CustomDefinition.validateStrategy.NON_EMPTY_STRING, m: 'You must input a date' })
    
    if (action === 'print') {
        console.log(`${getConf().hello}, ${opt.name} call the print on ${opt.date}`);
    } else {
        console.log(`OOps, ${opt.name} is ${action} now!!!`);
    }
}

// Initial command
/** @type {import('commander').Command} */
export const mySampleCommand = new Command(_CMD_NAME)
    .argument('[action]', `Action to perform, accepted values: ${_ACCEPT_ACTIONS.join(', ')}`)
    .addOption(new Option('-n, --name [string]', 'Optional: Your name.').default('xxxhand'))
    .addOption(new Option('-d, --date [string]', 'Optional: Date in yyyy-mm-dd').default(new Date().toISOString().substring(0, 10)))
    .description('My first cli command')
    .action(cmdHanlder);
