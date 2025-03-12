
/**
 * @typedef {object} IConfig
 * @property {string} hello
 * @property {string} world
 */

/** @type {IConfig} */
let conf = null;

/**
 * @description Load the config from the environment variables
 * @returns {void}
 */
export const loadConfig = () => {
    conf = {
        hello: process.env.PGM_HELLO,
        world: process.env.PGM_WORLD
    };
}

/**
 * @description Get config
 * @returns {IConfig}
 */
export const getConf = () => conf;