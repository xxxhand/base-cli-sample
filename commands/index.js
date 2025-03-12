import { mySampleCommand } from './my-samle.command.js';

/** @type {import('commander').Command[]} */
const cmds = [];

/** Push all commands into cmds here */
cmds.push(mySampleCommand);

export const myCmds = cmds;