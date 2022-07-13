'use strict';

const path = require('path');
const jessy = require('jessy');
const keys = require('all-object-keys');

module.exports.path = (pathEnv, cwdEnv) => {
    return [
        cwdEnv,
        path.sep,
        'node_modules',
        path.sep,
        '.bin',
        path.delimiter,
        pathEnv,
    ].join('');
};

module.exports.config = (config) => {
    const result = {};
    
    if (!config)
        return result;
    
    for (const key of keys('_', config)) {
        const name = `npm_package_config_${key}`;
        const value = jessy(key, '_', config);
        
        result[name] = value;
    }
    
    return result;
};

