/**
 * Created by piyush0 on 22/05/17.
 */

const {ipcRenderer} = require('electron');

let deleteReadySnipId = null;
let editReadySnip = null;
let modalTitle = null;
let modalLanguage = null;
let modalCode = null;

window.onload = function () {
    ipcRenderer.send('get-snips');
};

ipcRenderer.on('all-snips', function (event, data) {
    const table = document.getElementById("tablebody");

    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        table.innerHTML += "<tr id=" + data[i].id + ">" +
            "<td>" + data[i].title + "</td>" +
            "<td>" + data[i].language + "</td>" +
            "<td>" + data[i].code + "</td>" +
            '<td> <p data-placement="top" ' +
            'data-toggle="tooltip" title="Edit"> ' +
            '<button onclick="readyToEdit(this)" class="btn btn-primary btn-xs" ' +
            'data-title="Edit"' +
            ' data-toggle="modal"data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button>' +
            ' </p> </td> <td> <p data-placement="top" data-toggle="tooltip" title="Delete"> ' +
            '<button onclick="readyToDelete(this)" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal"data-target="#delete">' +
            '<span class="glyphicon glyphicon-trash"></span></button> </p> </td>' +
            "</tr>"
    }
});

function readyToDelete(element) {
    element = element.parentNode.parentNode.parentNode;
    
    let pos = element.id;
    deleteReadySnipId = pos;
}

function readyToEdit(element) {
    element = element.parentNode.parentNode.parentNode;


    editReadySnip = {
        id: element.id,
        title: element.firstChild.innerHTML,
        language: element.firstChild.nextSibling.innerHTML,
        code: element.firstChild.nextSibling.nextSibling.innerHTML
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
        "id":editReadySnip.id,
        "title": modalTitle.value,
        "language": modalLanguage.value,
        "code": modalCode.getValue()
    };
    ipcRenderer.send('new-snip-add', JSON.stringify(snip))
}

function deleteSnip() {
    ipcRenderer.send('delete-snip', deleteReadySnipId);
}

