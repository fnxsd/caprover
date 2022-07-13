'use strict';

const mapsome = require('..');
const test = require('tape');

test('mapsome', t => {
    const inc     = i => ++i;
    const condition = (a) => a > 3;
    const result  = mapsome(inc, condition, [1, 2, 3, 4, 5]);
    const expect = 4;
    
    t.deepEqual(result, expect);
    t.end();
});

test('mapsome: default condition', t => {
    const dec = a => --a;
    const result  = mapsome(dec, [1, 2, 3, 4, 5]);
    const expect = 1;
    
    t.deepEqual(result, expect);
    t.end();
});

test('arguments: no map', t => {
    t.throws(mapsome, /map should be a function!/, 'should throw when no map');
    t.end();
});

test('arguments: condition not a function', t => {
    let fn  = () => mapsome(() => {}, '', []);
   
    t.throws(fn, /condition should be a function!/, 'should throw when condition not a function');
    t.end();
});


test('arguments: no array', t => {
    let fn  = () => mapsome(() => {}, () => {});
   
    t.throws(fn, /array should be an array!/, 'should throw when no array');
    t.end();
});

