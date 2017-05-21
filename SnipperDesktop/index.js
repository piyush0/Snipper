/**
 * Created by piyush0 on 22/05/17.
 */

const {ipcRenderer} = require('electron')

window.onload = function () {

    ipcRenderer.send('get-snips');

    const btn_add = document.getElementById("btn_add");
    btn_add.onclick = function () {
        ipcRenderer.send('new-snip');
    }
};

ipcRenderer.on('all-snips', function (event, data) {
    const table = document.getElementById("table");

    table.innerHTML = "<th>Title</th>  <th>Language</th> <th>Snip</th>"

    console.log(data);
    
    for (let i = 0; i < data.length; i++) {
        
        table.innerHTML += "<tr id=" + data[i].id+
        " >" + "<td>" + data[i].title + "</td>" +
        "<td>" + data[i].language + "</td>" +
        "<td>" + data[i].code + "</td>" +
        "<td>" + "<button onclick='deleteSnip(this)'>" + "Delete" + "</button>" + "</td>"

        "</tr>"
    }
});

function deleteSnip(element) {

    element = element.parentNode.parentNode;

    let pos = element.id;
    console.log(pos);
    ipcRenderer.send('delete-snip', pos);
}

