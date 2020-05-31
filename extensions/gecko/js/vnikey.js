/**
 * vnikey@0.0.5
 * built on: Sun, 31 May 2020 07:51:20 GMT
 * repository: https://github.com/ndaidong/vnikey
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.vnikey = {}));
}(this, (function (exports) {
  const MAX_WORD_LEN = 7;
  const upperPairArray = (pairs) => {
    return pairs.map((pair) => {
      return [[...pair], [...pair.map((x) => x.toUpperCase())]];
    }).reduce((prev, curr) => {
      return [...prev, ...curr];
    }, []);
  };
  const transpose = (a) => {
    return Object.keys(a[0]).map((c) => {
      return a.map((r) => {
        return r[c];
      });
    });
  };
  const consonants = 'bcdđhgklmnpqrstvx';
  const allConsonants = [
    consonants,
    consonants.toUpperCase(),
  ].join('');
  const vowels = [
    'aăâeêioôơuưy',
    'áắấéếíóốớúứý',
    'àằầèềìòồờùừỳ',
    'ảẳẩẻểỉỏổởủửỷ',
    'ãẵẫẽễĩõỗỡũữỹ',
    'ạặậẹệịọộợụựỵ',
  ];
  const allVowels = [...vowels].map((queue) => {
    return queue + queue.toUpperCase();
  }).map((queue) => {
    return queue.split('');
  }).reduce((prev, curr) => {
    return [...prev, ...curr];
  }, []).join('');
  const vowelsWithMark = [...vowels].map((row) => {
    return [
      row[1],
      row[2],
      row[4],
      row[7],
      row[8],
      row[10],
    ];
  }).reduce((prev, curr) => {
    return [...prev, ...curr];
  }, []).join('');
  const vowelsWithAccent = [...vowels].slice(1).join('');
  const nonVN = [
    'ab,ace,act,ad,ae,ann,al,ag,ar,as',
    'bb,br,bl',
    'cc,ck,cl,cr,cs,ct',
    'dr',
    'ed,eg,el,er,es,ex',
    'f',
    'gl,gm,gn,gr',
    'ig,il,ir',
    'j',
    'kn,kr',
    'nc,nd,nk,np,nt,ns',
    'ocu,od,ol,oo,or',
    'pl,pr',
    'rd,rs,rt',
    'sp,st',
    'tb,tc,tt',
    'ub,ul',
    'w',
    'z',
  ].join(',');
  const allNonVN = [nonVN, nonVN.toUpperCase()].join(',').split(',');
  const d9MapChar = {
    d: 'đ',
    D: 'Đ',
  };
  const k8Map = [...vowels].map((row) => {
    return [
      [row[0], row[1]],
      [row[2], row[1]],
      [row[0].toUpperCase(), row[1].toUpperCase()],
      [row[2].toUpperCase(), row[1].toUpperCase()],
    ];
  }).reduce((prev, curr) => {
    return [...prev, ...curr];
  }, []);
  const k7Map = upperPairArray([
    ['uo', 'ươ'],
    ['uô', 'ươ'],
    ['uó', 'ướ'],
    ['uố', 'ướ'],
    ['uò', 'ườ'],
    ['uồ', 'ườ'],
    ['uỏ', 'ưở'],
    ['uổ', 'ưở'],
    ['uõ', 'ưỡ'],
    ['uỗ', 'ưỡ'],
    ['uọ', 'ượ'],
    ['uộ', 'ượ'],
  ].concat([...vowels].map((row) => {
    return [
      [row[6], row[8]],
      [row[7], row[8]],
      [row[9], row[10]],
    ];
  }).reduce((prev, curr) => {
    return [...prev, ...curr];
  }, [])));
  const k6Map = upperPairArray([
    ['uo', 'uô'],
    ['ươ', 'uô'],
    ['uó', 'uố'],
    ['ướ', 'uố'],
    ['uò', 'uồ'],
    ['ườ', 'uồ'],
    ['uỏ', 'uổ'],
    ['ưở', 'uổ'],
    ['uõ', 'uỗ'],
    ['ưỡ', 'uỗ'],
    ['uọ', 'uộ'],
    ['ượ', 'uộ'],
  ].concat([...vowels].map((row) => {
    return [
      [row[0], row[2]],
      [row[1], row[2]],
      [row[3], row[4]],
      [row[6], row[7]],
      [row[8], row[7]],
    ];
  }).reduce((prev, curr) => {
    return [...prev, ...curr];
  }, [])));
  const transposedVowels = transpose([...vowels].map((row) => {
    return row.split('');
  }));
  const accentMap = {
    1: upperPairArray([...transposedVowels].map((row) => {
      return [[...row.slice(0, 1), ...row.slice(2)].join(''), row[1]];
    })),
    2: upperPairArray([...transposedVowels].map((row) => {
      return [[...row.slice(0, 2), ...row.slice(3)].join(''), row[2]];
    })),
    3: upperPairArray([...transposedVowels].map((row) => {
      return [[...row.slice(0, 3), ...row.slice(4)].join(''), row[3]];
    })),
    4: upperPairArray([...transposedVowels].map((row) => {
      return [[...row.slice(0, 4), ...row.slice(5)].join(''), row[4]];
    })),
    5: upperPairArray([...transposedVowels].map((row) => {
      return [[...row.slice(0, 5)].join(''), row[5]];
    })),
  };
  const isNotVN = (word) => {
    return allNonVN.some((x) => word.search(x) > -1);
  };
  const isConsonant = (letter) => {
    return letter && allConsonants.indexOf(letter) !== -1;
  };
  const isVowel = (letter) => {
    return letter && allVowels.indexOf(letter) !== -1;
  };
  const isVowelWithMark = (letter) => {
    return letter && vowelsWithMark.indexOf(letter) !== -1;
  };
  const isVowelWithAccent = (letter) => {
    return letter && vowelsWithAccent.indexOf(letter) !== -1;
  };
  const isValidChar = (char) => {
    return isConsonant(char) || isVowel(char);
  };
  const getVowelInfo = (letters = []) => {
    const info = {
      count: 0,
      mark: 0,
    };
    for (const char of letters) {
      if (isVowel(char)) {
        info.count++;
      }
      if (isVowelWithMark(char)) {
        info.mark++;
      }
    }
    const lastLetter = letters[letters.length - 1];
    info.endWithVowel = allVowels.indexOf(lastLetter) >= 0;
    return info;
  };
  const replaceAccent = (letter, keynum) => {
    const accentKeyPairs = accentMap[keynum];
    for (const pair of accentKeyPairs) {
      if (pair[0].includes(letter)) {
        return pair[1];
      }
    }
    return letter;
  };
  const assignAccent = (keynum, letters, curpos) => {
    const {count, mark, endWithVowel} = getVowelInfo(letters);
    const lim = Math.min(curpos, letters.length);
    if (mark > 0) {
      for (let i = lim - 1; i >= 0; i--) {
        const char = letters[i];
        if (isVowelWithMark(char)) {
          const nextChar = letters[i + 1];
          if (isVowelWithAccent(nextChar)) {
            break;
          }
          const replacement = replaceAccent(char, keynum);
          if (replacement != char) {
            letters[i] = replacement;
            return letters.join('');
          }
        }
      }
    } else if (count === 1) {
      for (let i = lim - 1; i >= 0; i--) {
        const char = letters[i];
        if (isVowel(char)) {
          const replacement = replaceAccent(char, keynum);
          if (replacement != char) {
            letters[i] = replacement;
            return letters.join('');
          }
        }
      }
    } else if (count === 2) {
      const word = letters.join('');
      if (!endWithVowel || word.startsWith('qu') || word.startsWith('gi')) {
        for (let i = lim - 1; i >= 0; i--) {
          const char = letters[i];
          if (isVowel(char)) {
            const nextChar = letters[i + 1];
            if (isVowelWithAccent(nextChar)) {
              break;
            }
            const replacement = replaceAccent(char, keynum);
            if (replacement != char) {
              letters[i] = replacement;
              return letters.join('');
            }
          }
        }
      } else {
        for (let i = 0; i < lim; i++) {
          const char = letters[i];
          if (isVowel(char)) {
            const prevChar = letters[i - 1];
            if (isVowelWithAccent(prevChar)) {
              break;
            }
            const replacement = replaceAccent(char, keynum);
            if (replacement != char) {
              letters[i] = replacement;
              return letters.join('');
            }
          }
        }
      }
    } else if (count === 3) {
      let ignored = false;
      for (let i = lim - 1; i >= 0; i--) {
        const char = letters[i];
        if (isVowel(char)) {
          if (!ignored) {
            ignored = true;
            continue;
          }
          const replacement = replaceAccent(char, keynum);
          if (replacement != char) {
            letters[i] = replacement;
            return letters.join('');
          }
        }
      }
    }
    letters.splice(curpos, 0, keynum);
    return letters.join('');
  };
  const assignMark = (keynum, letters, curpos) => {
    if (keynum === 8) {
      for (const pair of k8Map) {
        const origin = pair[0];
        const transforming = pair[1];
        for (let i = curpos - 1; i >= 0; i--) {
          const achar = letters[i];
          if (achar === origin) {
            letters[i] = transforming;
            return letters.join('');
          }
        }
      }
    } else if (keynum === 7) {
      for (const pair of k7Map) {
        const origin = pair[0];
        const transforming = pair[1];
        if (origin.length === 2) {
          const word = letters.join('');
          if (word.search(origin) > -1) {
            return word.replace(origin, transforming);
          }
        } else {
          for (let i = curpos - 1; i >= 0; i--) {
            const achar = letters[i];
            if (achar === origin) {
              letters[i] = transforming;
              return letters.join('');
            }
          }
        }
      }
    } else if (keynum === 6) {
      for (const pair of k6Map) {
        const origin = pair[0];
        const transforming = pair[1];
        if (origin.length === 2) {
          const word = letters.join('');
          if (word.search(origin) > -1) {
            return word.replace(origin, transforming);
          }
        } else {
          for (let i = curpos - 1; i >= 0; i--) {
            const achar = letters[i];
            if (achar === origin) {
              letters[i] = transforming;
              return letters.join('');
            }
          }
        }
      }
    }
    letters.splice(curpos, 0, keynum);
    return letters.join('');
  };
  const assignD = (keynum, letters, curpos) => {
    if (letters[0] in d9MapChar) {
      letters[0] = d9MapChar[letters[0]];
    } else if (letters[curpos - 1] in d9MapChar) {
      letters[curpos - 1] = d9MapChar[letters[curpos - 1]];
    } else {
      letters.splice(curpos, 0, keynum);
    }
    return letters.join('');
  };
  const getReplacement = (keynum, word, curpos) => {
    const letters = word.split('');
    if (curpos === 0 || word.length > MAX_WORD_LEN || isNotVN(word)) {
      letters.splice(curpos, 0, keynum);
    } else if (keynum === 9) {
      return assignD(keynum, letters, curpos);
    } else if ([8, 7, 6].includes(keynum)) {
      return assignMark(keynum, letters, curpos);
    } else if ([5, 4, 3, 2, 1].includes(keynum)) {
      return assignAccent(keynum, letters, curpos);
    }
    return letters.join('');
  };
  const findReplacer = (keynum, val, cursorPosition) => {
    const vleft = val.substring(0, cursorPosition);
    const vright = val.substring(cursorPosition);
    let leftPos = vleft.length;
    for (let i = leftPos; i >= 0; i--) {
      const char = vleft[i];
      if (char && !isValidChar(char)) {
        break;
      }
      leftPos = i;
    }
    let rightPos = 0;
    for (let i = rightPos; i < vright.length; i++) {
      const char = vright[i];
      if (char && !isValidChar(char)) {
        break;
      }
      rightPos = i + 1;
    }
    const relativePos = cursorPosition - leftPos;
    rightPos += cursorPosition;
    const theWholeText = [vleft, vright].join('');
    const leftPart = theWholeText.substr(0, leftPos);
    const rightPart = theWholeText.substr(rightPos, theWholeText.length);
    const activeWord = theWholeText.substring(leftPos, rightPos);
    const replaceWord = getReplacement(keynum, activeWord, relativePos);
    const replacement = [leftPart, ...replaceWord, rightPart].join('');
    const curpos = cursorPosition + replaceWord.length - activeWord.length;
    return {
      replacement,
      curpos,
    };
  };
  const isTextInput = (tag) => {
    const tagType = tag.getAttribute('type');
    return tag.nodeName === 'INPUT' && (tagType === 'text' || tagType === 'search');
  };
  const isTextArea = (tag) => {
    return tag.nodeName === 'TEXTAREA';
  };
  const isContentEditable = (tag) => {
    return tag.nodeName !== 'BODY' && tag.isContentEditable;
  };
  const isIframeEditor = (tag) => {
    return tag.nodeName === 'BODY' && tag.parentNode &&
      tag.parentNode.parentNode && tag.parentNode.parentNode.designMode === 'on';
  };
  const isInterested = (tag) => {
    return isTextInput(tag) || isTextArea(tag) || isIframeEditor(tag) || isContentEditable(tag);
  };
  const getSelRange = (evt) => {
    const target = evt.target;
    const sel = isContentEditable(target) ? window.getSelection() : (() => {
      const doc = target.parentNode.parentNode;
      const win = doc.defaultView || doc.parentWindow;
      return win.getSelection();
    })();
    return sel ? sel.rangeCount > 0 ? sel : null : null;
  };
  const getCursorPosition = (input) => {
    return 'selectionStart' in input && document.activeElement === input ? input.selectionStart : -1;
  };
  const updateText = (evt, replacement, curpos) => {
    const elm = evt.target;
    elm.value = replacement;
    elm.focus();
    elm.selectionEnd = curpos;
    evt.preventDefault();
  };
  const updateRangeText = (evt, replacement, curpos, node, range) => {
    const data = node.data;
    node.deleteData(0, data.length);
    node.insertData(0, replacement);
    range.setStart(node, curpos);
    evt.preventDefault();
  };
  const resolveRange = (evt, keynum) => {
    const sel = getSelRange(evt);
    if (!sel) {
      return false;
    }
    const range = sel.getRangeAt(0);
    const cursorPosition = range.startOffset;
    if (cursorPosition != range.endOffset) {
      return false;
    }
    const node = range.startContainer;
    const {
      replacement,
      curpos,
    } = findReplacer(keynum, node.data, cursorPosition);
    updateRangeText(evt, replacement, curpos, node, range);
  };
  const resolve = (evt, keycode) => {
    if (keycode < 49 || keycode > 57) {
      return false;
    }
    const keynum = keycode - 48;
    const target = evt.target;
    if (isIframeEditor(target) || isContentEditable(target)) {
      return resolveRange(evt, keynum);
    }
    const cursorPosition = getCursorPosition(evt.target);
    if (cursorPosition === -1) {
      return false;
    }
    const {
      replacement,
      curpos,
    } = findReplacer(keynum, target.value, cursorPosition);
    updateText(evt, replacement, curpos);
  };
  const onKeyPress = (evt) => {
    const target = evt.target;
    const keycode = evt.which || evt.keyCode;
    return isInterested(target) ? resolve(evt, keycode) : false;
  };
  const registerEventListener = (element, evt, handler) => {
    return element.addEventListener(evt, handler, false);
  };
  const autoSetup = () => {
    registerEventListener(document, 'keypress', onKeyPress);
    Array.from(document.getElementsByTagName('iframe')).forEach((frame) => {
      const doc = frame.contentWindow.document;
      registerEventListener(doc, 'keypress', onKeyPress);
    });
  };
  const init = () => {
    const rt = document.readyState;
    const c = rt !== 'loading';
    return c ? setTimeout(autoSetup, 0) : document.addEventListener('DOMContentLoaded', autoSetup);
  };
  init();

  exports.findReplacer = findReplacer;
  exports.init = init;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
