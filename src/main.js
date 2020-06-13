/**
 * vnikey
 * @ndaidong
**/

import {
  isContentEditable,
  isIframeEditor,
  isInterested,
} from './validator.js';

import {
  findReplacer,
} from './rules.js';


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


const exitEvent = (evt) => {
  evt.cancelBubble = true;
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  if (evt.preventDefault) {
    evt.preventDefault();
  }
  return false;
};

const updateText = (evt, replacement, curpos) => {
  const elm = evt.target;
  elm.value = replacement;
  elm.focus();
  elm.selectionEnd = curpos;
  exitEvent(evt);
};

const updateRangeText = (evt, replacement, curpos, node, range) => {
  const data = node.data;
  node.deleteData(0, data.length);
  node.insertData(0, replacement);
  range.setStart(node, curpos);
  exitEvent(evt);
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

  return updateRangeText(evt, replacement, curpos, node, range);
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

  return updateText(evt, replacement, curpos);
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
  Array.from(document.getElementsByTagName('iframe')).filter((frame) => {
    return frame.src === '';
  }).forEach((frame) => {
    const doc = frame.contentWindow.document;
    registerEventListener(doc, 'keypress', onKeyPress);
  });
};

export const init = () => {
  const rt = document.readyState;
  const c = rt !== 'loading';
  return c ? setTimeout(autoSetup, 0) : document.addEventListener('DOMContentLoaded', autoSetup);
};

export * from './validator';
export * from './rules';

init();
