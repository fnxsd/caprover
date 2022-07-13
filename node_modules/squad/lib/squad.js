'use strict';

const compose = [
    () => () => {},
    (f) => (...a) => f(...a),
    (f1, f2) => (...a) => f1(f2(...a)),
    (f1, f2, f3) => (...a) => f1(f2(f3(...a))),
    (f1, f2, f3, f4) => (...a) => f1(f2(f3(f4(...a)))),
    (f1, f2, f3, f4, f5) => (...a) => f1(f2(f3(f4(f5(...a))))),
    (f1, f2, f3, f4, f5, f6) => (...a) => f1(f2(f3(f4(f5(f6(...a)))))),
    (f1, f2, f3, f4, f5, f6, f7) => (...a) => f1(f2(f3(f4(f5(f6(f7(...a))))))),
];

module.exports = (...fns) => {
    if (fns.length < compose.length)
        return compose[fns.length](...fns);
    
    return bigCompose(fns);
}

function bigCompose(fns) {
    return (...args) => {
        let i = fns.length - 1;
        let value = fns[i](...args);
    
        while (--i)
            value = fns[i](value);
        
        return value;
    }
}

