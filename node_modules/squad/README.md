# squad [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

Right-to-left function composition. The rightmost function may have any arity. The remaining functions must be unary.

## Install

```
npm i squad
```

## How to use?

```js
const squad = require('squad');

const buzz = (str) => str + '... zzz...';
const scream = (str) => str.toUpperCase();
const noise = squad(buzz, scream);

noise('hello');
// returns
'HELLO... zzz....'
```

## Environments

In old `node.js` environments that supports `es5` only, `squad` could be used with:

```js
var squad = require('squad/legacy');
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/squad.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/squad/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/squad.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/squad "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/squad  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/squad "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

