# vnikey

Browser extension for typing Vietnamese diacritical marks in the web browsers.

## Install

### Webkit based browsers (Chrome, Chomium, Brave, Vivaldi, Opera, etc)

- [vnikey for Webkit](https://chrome.google.com/webstore/detail/gipmmnagikfceadakmonbllelfjcmbam)

### Gecko based browsers (Firefox, LibreWolf, Waterfox, SeaMonkey, etc)

- [vnikey for Gecko](https://addons.mozilla.org/en-US/firefox/addon/vnikey-for-gecko/)

### Limitations

`vnikey` is an extension for typing Vietnamese, similar to other libraries as HIM, VIM, Mudim, etc. However `vnikey` supports only VNI type mode (aka "Vietnamese number key based"). Personally I appreciate the intelligence and elegance of the VNI typing method. It's great to type English terms mixed with Vietnamese. But if you are already using TELEX or VIQR, then `vnikey` is not for you.

`vnikey` also doesn't not provide the further features like auto-correct spelling errors. There is the better tools for that.

`vnikey` focuses on the main purpose: easy to type Vietnamese as long as English. It tries to avoid to place accent marks when you type something looks like English.

### VNI typing method

Basically VNI method uses the number keys from 1 to 9 to add diacritical marks to the words and letters, in which the keys 1, 2, 3, 4, 5 used for tone marks, the keys 6, 7, 8 for vowel marks, and the key 9 for crossed D/d (dyet).

| Keys     | 1 <sup>!</sup> | 2 <sup>@</sup> | 3 <sup>#</sup> | 4 <sup>$</sup> | 5 <sup>%</sup> | 6 <sup>^</sup> | 7 <sup>&</sup> | 8 <sup>*</sup> | 9 <sup>(</sup> |
| -------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
| Meaning  | acute          | grave          | hook           | tilde          | underdot       | circumflex     | horn           | breve          | dyet           |
| Examples | á, é...        | à, è...        | ả, ẻ...        | á, é...        | ạ, ẹ...        | â, ê...        | ơ, ư           | ă              | đ, Đ           |

Thus, to get "Chào Việt Nam", we type "Chao2 Vie6t5 Nam".

# License

The MIT License (MIT)
