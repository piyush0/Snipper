/**
 * Created by piyush0 on 22/05/17.
 */
const {ipcRenderer} = require('electron')

var btn_add_snip;
var title;
var code;
var language;
var id;
window.onload = function () {

    ipcRenderer.send('edit-ready');
    btn_add_snip = document.getElementById("btn_add_snip");

    title = document.getElementById("title");

    language = document.getElementById("language");

    code = document.getElementById("code");

    btn_add_snip.onclick = function () {
        var snip = {
            "id":id,
            "title": title.value,
            "language": language.value,
            "code": code.value
        };
        console.log(snip);
        ipcRenderer.send('new-snip-add', JSON.stringify(snip))
    }
}

ipcRenderer.on('edit', function (event, data) {
    title.value = data.title;
    language.value = data.language;
    code.value = data.code;
    id = data.id
});
