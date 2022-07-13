'use strict';

const wrap = (fn) => (...a) => (...b) => fn(...a, ...b);

module.exports = (fn, ...a) => {
    check(fn);
    
    if (a.length)
        return wrap(fn)(...a);
    
    return wrap(fn);
};

function check(fn) {
    if (typeof fn !== 'function')
        throw Error('fn should be a function!');
}

