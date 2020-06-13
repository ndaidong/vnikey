// validator

const isTextInput = (tag) => {
  const tagType = tag.getAttribute('type') || 'text';
  return tag.nodeName === 'INPUT' && (tagType === 'text' || tagType === 'search');
};

const isTextArea = (tag) => {
  return tag.nodeName === 'TEXTAREA';
};

export const isContentEditable = (tag) => {
  return tag.nodeName !== 'BODY' && tag.isContentEditable;
};

export const isIframeEditor = (tag) => {
  return tag.nodeName === 'BODY' && tag.parentNode &&
    tag.parentNode.parentNode && tag.parentNode.parentNode.designMode === 'on';
};

export const isInterested = (tag) => {
  return isTextInput(tag) || isTextArea(tag) || isIframeEditor(tag) || isContentEditable(tag);
};
