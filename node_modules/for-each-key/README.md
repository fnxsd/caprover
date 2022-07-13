# for-each-key [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage][CoverageIMGURL]][CoverageURL]

Call a function with key and value for each object property.

## Install

```
npm i for-each-key --save
```

## How to use?

```js
const forEachKey = require('for-each-key');

forEachKey(console.log, {
    hello: 'world'
});
// output
'hello world'
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/for-each-key.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/for-each-key/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/for-each-key.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/for-each-key "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/for-each-key  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/for-each-key "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/for-each-key?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/for-each-key/badge.svg?branch=master&service=github

