// main.js

import '../src/main.js';


const createEditor = (area) => {
  area.innerHTML = '';
  const ifr = document.createElement('iframe');
  area.appendChild(ifr);
  ifr.className = 'iframe-editor';
  const editor = ifr.contentWindow.document;
  editor.designMode = 'On';
  editor.open();
  editor.write(`
    <html>
      <head></head>
      <body style="font-size: 16px; background-color: #000; color: #fff;">
      </body>
    </html>`);
  editor.close();
};


const init = () => {
  const btn = document.getElementById('btn_add_editor');
  const area = document.getElementById('new_editor_container');
  btn.onclick = () => {
    return createEditor(area);
  };
};

window.onload = init;
