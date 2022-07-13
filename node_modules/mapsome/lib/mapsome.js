'use strict';

const id = (a) => a;

module.exports = (map, condition, array) => {
    if (!array) {
        array = condition;
        condition = id;
    }
    
    check(map, condition, array);
    
    const n = array.length;
    let i = n + 1;
    
    while(--i) {
        const current = n - i;
        const result = map(array[current], i, array);
        
        if (condition(result))
            return result;
    }
}

function check(map, condition, array) {
    if (typeof map !== 'function')
        throw Error('map should be a function!');
    
    if (typeof condition !== 'function')
        throw Error('condition should be a function!');
    
    if (!Array.isArray(array))
        throw Error('array should be an array!');
}
