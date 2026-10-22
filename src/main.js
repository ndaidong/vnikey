/**
 * vnikey
 * @ndaidong
**/

import {
  isContentEditable,
  isIframeEditor,
  isInterested,
} from "./validator.js";

import { findReplacer } from "./rules.js";

const getDigit = (evt) => {
  const key = evt.key;
  return key && key >= "1" && key <= "9" ? Number(key) : -1;
};

const isSkippableEvent = (evt) => {
  return evt.isComposing || evt.ctrlKey || evt.metaKey || evt.altKey;
};

const getWindowOf = (node) => {
  const doc = node.ownerDocument || document;
  return doc.defaultView || window;
};

const getCursorPosition = (input) => {
  return "selectionStart" in input && document.activeElement === input
    ? input.selectionStart
    : -1;
};

const getNativeValueSetter = (elm) => {
  const proto = elm instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(proto, "value");
  return descriptor ? descriptor.set : null;
};

const updateText = (elm, replacement, curpos) => {
  // use the native setter so controlled inputs (React, Vue, ...)
  // detect the change and fire their own onChange handler
  const setter = getNativeValueSetter(elm);
  if (setter) {
    setter.call(elm, replacement);
  } else {
    elm.value = replacement;
  }
  elm.setSelectionRange(curpos, curpos);
  elm.dispatchEvent(
    new InputEvent("input", {
      bubbles: true,
      data: replacement,
      inputType: "insertText",
    }),
  );
};

const moveCursorBy = (win, delta) => {
  if (!delta) {
    return;
  }
  const sel = win.getSelection();
  if (!sel || sel.rangeCount === 0) {
    return;
  }
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) {
    return;
  }
  const pos = Math.max(0, Math.min(node.length, range.startOffset + delta));
  range.setStart(node, pos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

const updateRangeText = (node, start, end, replaceWord, curpos) => {
  const win = getWindowOf(node);
  const sel = win.getSelection();
  if (!sel || sel.rangeCount === 0) {
    return false;
  }
  const range = sel.getRangeAt(0);
  range.setStart(node, start);
  range.setEnd(node, end);
  sel.removeAllRanges();
  sel.addRange(range);

  // prefer execCommand so rich editors (Draft.js, ProseMirror, Quill, ...)
  // receive proper beforeinput/input events and keep their model in sync
  let done = false;
  try {
    done = node.ownerDocument.execCommand("insertText", false, replaceWord);
  } catch (err) {
    done = false;
  }

  if (done) {
    moveCursorBy(win, curpos - (start + replaceWord.length));
    return true;
  }

  node.deleteData(start, end - start);
  node.insertData(start, replaceWord);
  range.setStart(node, curpos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  return true;
};

const resolveRange = (evt, keynum) => {
  const doc = evt.target.ownerDocument || document;
  const win = doc.defaultView || window;
  const sel = win.getSelection();
  if (!sel || sel.rangeCount === 0) {
    return false;
  }
  const range = sel.getRangeAt(0);
  if (range.startOffset !== range.endOffset) {
    return false;
  }
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) {
    return false;
  }
  const cursorPosition = range.startOffset;
  const {
    start,
    end,
    replaceWord,
    curpos,
    transformed,
  } = findReplacer(keynum, node.data, cursorPosition);
  if (!transformed) {
    return false;
  }
  return updateRangeText(node, start, end, replaceWord, curpos);
};

const resolveInput = (evt, keynum) => {
  const elm = evt.target;
  if (elm.readOnly || elm.disabled) {
    return false;
  }
  const cursorPosition = getCursorPosition(elm);
  if (cursorPosition === -1) {
    return false;
  }
  const { replacement, curpos, transformed } = findReplacer(
    keynum,
    elm.value,
    cursorPosition,
  );
  if (!transformed) {
    return false;
  }
  updateText(elm, replacement, curpos);
  return true;
};

const resolve = (evt, keynum) => {
  const target = evt.target;
  if (isIframeEditor(target) || isContentEditable(target)) {
    return resolveRange(evt, keynum);
  }
  return resolveInput(evt, keynum);
};

const onKeyDown = (evt) => {
  if (isSkippableEvent(evt)) {
    return false;
  }
  const keynum = getDigit(evt);
  if (keynum === -1) {
    return false;
  }
  const target = evt.target;
  if (!isInterested(target)) {
    return false;
  }
  if (!resolve(evt, keynum)) {
    // no Vietnamese transformation happened,
    // let the browser or the app insert the digit natively
    return false;
  }
  evt.preventDefault();
  evt.stopPropagation();
  return true;
};

const registerEventListener = (element, evt, handler) => {
  return element.addEventListener(evt, handler, true);
};

const autoSetup = () => {
  registerEventListener(document, "keydown", onKeyDown);
  const applyEventListenerTo = (elm) => {
    const doc = elm.contentWindow.document;
    registerEventListener(doc, "keydown", onKeyDown);
    return elm;
  };
  Array.from(document.getElementsByTagName("iframe"))
    .filter((frame) => {
      return frame.src === "";
    })
    .map(applyEventListenerTo);

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      Array.from(mutation.addedNodes)
        .filter((node) => {
          return node.tagName === "IFRAME";
        })
        .map(applyEventListenerTo);
    }
  });

  const config = {
    attributes: false,
    childList: true,
    subtree: true,
  };

  observer.observe(document.body, config);
};

export const init = () => {
  const rt = document.readyState;
  const c = rt !== "loading";
  return c
    ? setTimeout(autoSetup, 0)
    : document.addEventListener("DOMContentLoaded", autoSetup);
};

export * from "./validator";
export * from "./rules";

init();
