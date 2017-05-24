/**
 * Created by piyush0 on 22/05/17.
 */
const {ipcRenderer} = require('electron')

function newSnip() {
    let title = document.getElementById("title");
    let language = document.getElementById("language");
    let code = ace.edit("editor");

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
