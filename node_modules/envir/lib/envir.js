'use strict';

const env = require('./env');
const {assign} = Object;

module.exports = (pathEnv, dir, info) => {
    check(pathEnv, dir, info);
    
    const {config} = info;
    const PATH = env.path(pathEnv, dir);
    const envVars = assign(env.config(config), {
        PATH,
        npm_package_version: info.version,
        npm_package_name: info.name,
    });
    
    return envVars;
};

function check(pathEnv, dir, info) {
    if (typeof pathEnv !== 'string')
        throw Error('pathEnv should be a string!');
    
    if (typeof dir !== 'string')
        throw Error('dir should be a string!');
    
    if (typeof info !== 'object')
        throw Error('info should be an object!');
}

