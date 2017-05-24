/**
 * Created by piyush0 on 22/05/17.
 */
const {ipcRenderer} = require('electron')

let btn_add_snip;
let title;
let code;
let language;
let id;


function newSnip() {
    title = document.getElementById("title");
    language = document.getElementById("language");
    code = ace.edit("editor");

    const snip = {
        "title": title.value,
        "language": language.value,
        "code": code.getValue()
    };
    ipcRenderer.send('new-snip-add', JSON.stringify(snip))
}

function closeWin() {
    ipcRenderer.send('close-snip-win');
}
