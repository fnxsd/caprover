'use strict';

const setValue = (fn, obj) => (key) => fn(key, obj[key]);

module.exports = (fn, obj) => {
    Object
        .keys(obj)
        .forEach(setValue(fn, obj));
};

