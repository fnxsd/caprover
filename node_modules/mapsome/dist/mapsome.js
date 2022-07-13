(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mapsome = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"mapsome":[function(require,module,exports){
'use strict';

var id = function id(a) {
    return a;
};

module.exports = function (map, condition, array) {
    if (!array) {
        array = condition;
        condition = id;
    }

    check(map, condition, array);

    var n = array.length;
    var i = n + 1;

    while (--i) {
        var current = n - i;
        var result = map(array[current], i, array);

        if (condition(result)) return result;
    }
};

function check(map, condition, array) {
    if (typeof map !== 'function') throw Error('map should be a function!');

    if (typeof condition !== 'function') throw Error('condition should be a function!');

    if (!Array.isArray(array)) throw Error('array should be an array!');
}
},{}]},{},["mapsome"])("mapsome")
});