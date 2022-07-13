# Wraptile [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Translate the evaluation of a function that takes multiple arguments into evaluating a sequence of 2 functions, each with a any count of arguments.

## Install

```
npm i wraptile --save
```

## How to use?

```js
const wraptile = require('wraptile');
const log = wraptile((data) => console.log(data));

window.addEventListener('click', logwrap('click'));
// every time someone click log
'click'
```

## Related

- [zames](https://github.com/coderaiser/zames "zames") - converts callback-based functions to Promises and apply currying to arguments.

- [currify](https://github.com/coderaiser/currify "currify") - translate the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single or more arguments.

- [fullstore](https://github.com/coderaiser/fullstore "fullstore") - functional variables.

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/wraptile.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/wraptile/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/wraptile.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/wraptile "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/wraptile  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/wraptile "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/wraptile?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/wraptile/badge.svg?branch=master&service=github

