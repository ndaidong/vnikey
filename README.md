# vnikey

Small JavaScript library for typing Vietnamese diacritical marks in the web browsers.

[![NPM](https://badge.fury.io/js/vnikey.svg)](https://badge.fury.io/js/vnikey)
[![Build Status](https://travis-ci.org/ndaidong/vnikey.svg?branch=master)](https://travis-ci.org/ndaidong/vnikey)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/vnikey/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/vnikey?branch=master)

### About `vnikey`

`vnikey` is a tool for typing Vietnamese, similar to other libraries as HIM, VIM, Mudim, etc. However `vnikey` supports only VNI type mode (aka "Vietnamese number key based"). Personally I appreciate the intelligence and elegance of the VNI typing method. It's great to type English terms mixed with Vietnamese. But if you are already using TELEX or VIQR,  then `vnikey` is not for you.

`vnikey` also doesn't not provide the further features like auto-correct spelling errors. There is the better tools for that.

`vnikey` focuses on the main purpose: easy to type Vietnamese as long as English. It tries to avoid to place accent marks when you type something looks like English.

### About VNI typing method

Basically VNI method uses the number keys from 1 to 9 to add diacritical marks to the words and letters, in which the keys 1, 2, 3, 4, 5 used for tone marks, the keys 6, 7, 8 for vowel marks, and the key 9 for crossed D/d (dyet).

| Keys | 1 <sup>!</sup> | 2 <sup>@</sup> | 3 <sup>#</sup> | 4 <sup>$</sup> | 5  <sup>%</sup> | 6 <sup>^</sup> | 7 <sup>&</sup> | 8 <sup>*</sup> | 9 <sup>(</sup> |
|--|--|--|--|--|--|--|--|--|--|
| Meaning | acute | grave | hook | tilde | underdot | circumflex | horn | breve | dyet
| Examples | á, é... | à, è... | ả, ẻ... | á, é... | ạ, ẹ... | â, ê... | ơ, ư | ă | đ, Đ |


Thus, to get "Chào Việt Nam", we type "Chao2 Vie6t5 Nam".

### Demo

- https://ndaidong.github.io/vnikey


##  Embed `vnikey` into the web pages

- CDN

  - [vnikey.js](https://cdn.jsdelivr.net/npm/vnikey@latest)


- NPM

```
npm i vnikey
```

And then:

```js
import 'vnikey'
```

## Extensions for web browsers

### Webkit based browsers (Chrome, Vivaldi, Chomium, Opera, etc)

- [vnikey for Webkit]() (Pending Review)
- [vnikey v0.0.9 for Webkit](https://github.com/ndaidong/vnikey/releases/download/v0.0.9/vnikey_v0.0.9_webkit.zip)

### Gecko based browsers (Firefox, SeaMonkey, etc)

- [vnikey for Gecko](https://addons.mozilla.org/en-US/firefox/addon/vnikey-for-gecko/)
- [vnikey v0.0.9 for Gecko](https://github.com/ndaidong/vnikey/releases/download/v0.0.9/vnikey_v0.0.9_gecko.zip)


# Test

```
git clone https://github.com/ndaidong/vnikey.git
cd vnikey
npm install
npm test
```

# License

The MIT License (MIT)
