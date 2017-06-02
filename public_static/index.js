/**
 * Created by piyush0 on 22/05/17.
 */

const {ipcRenderer} = require('electron');

const MAX_DISPLAY_SIZE = 200;

let deleteReadySnipId = null;
let editReadySnip = null;
let modalTitle = null;
let modalLanguage = null;
let modalCode = null;
let codes = [];
let editBlock = '<td> <p data-placement="top" data-toggle="tooltip" title="Edit"><button onclick="readyToEdit(this)" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal"data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td> ';
let deleteBlock = '<td> <p data-placement="top" data-toggle="tooltip" title="Delete"><button onclick="readyToDelete(this)" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal"data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button> </p> </td>';
let copyBlock = '<td> <p data-placement="top"<button onclick="copyToClip(this)" class="btn btn-primary btn-xs" data-title="Copy"><span class="glyphicon glyphicon-copy"></span></button></p> </td> '

window.onload = function () {
    ipcRenderer.send('get-snips');
};

ipcRenderer.on('all-snips', function (event, data) {
    const table = document.getElementById("tablebody");
    const searchBox = document.getElementById("srch-term");
    searchBox.oninput = search
    table.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        codes[i] = data[i].code;
        if (data[i].code.length > MAX_DISPLAY_SIZE) {
            data[i].code = data[i].code.substring(0, MAX_DISPLAY_SIZE);
            data[i].code += "<i> More... </i>"
        }

        table.innerHTML += "<tr id=" + data[i].id + ">" +
            "<td>" + data[i].title + "</td>" +
            "<td>" + data[i].language + "</td>" +
            "<td id=" + i + '>' + "<pre>" + data[i].code + "</pre>" + "</td>" + editBlock + deleteBlock + copyBlock + "</tr>"
    }
});

function search(event) {
    ipcRenderer.send('search-snip', event.srcElement.value);
}

function copyToClip(element) {
    element = element.parentNode.parentNode;
    let code = codes[element.firstChild.nextSibling.nextSibling.id];
    ipcRenderer.send('copy-to-clip', code);
}


function readyToDelete(element) {
    element = element.parentNode.parentNode.parentNode;
    deleteReadySnipId = element.id;
}

function readyToEdit(element) {
    element = element.parentNode.parentNode.parentNode;

    editReadySnip = {
        id: element.id,
        title: element.firstChild.innerHTML,
        language: element.firstChild.nextSibling.innerHTML,
        code: codes[element.firstChild.nextSibling.nextSibling.id]
    };


    modalTitle = document.getElementById("title");
    modalLanguage = document.getElementById("language");
    modalCode = ace.edit("editor");

    modalTitle.setAttribute("value", editReadySnip.title);
    modalLanguage.setAttribute("value", editReadySnip.language);
    modalCode.setValue(editReadySnip.code);
}

function editSnip() {
    const snip = {
        "id": editReadySnip.id,
        "title": modalTitle.value,
        "language": modalLanguage.value,
        "code": modalCode.getValue()
    };

    ipcRenderer.send('new-snip-add', JSON.stringify(snip))
}

function deleteSnip() {
    ipcRenderer.send('delete-snip', deleteReadySnipId);
}

function newSnip() {
    ipcRenderer.send('new-snip');
}