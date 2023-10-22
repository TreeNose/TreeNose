const { text } = require("express");

const codeImportButton = document.getElementById("codeImportButton");

codeImportButton.addEventListener("click", ()=>{
    var lang = document.getElementById("lang");
    var code = document.getElementById("sourceCode").value;
    const dataToSend = {
        lang: lang,
        code: code
    }
    fetch('http://localhost:3000/get-tree-structure',{
        method: "POST",
        body: JSON.stringify(
            dataToSend
        ),
        headers: {
            "Content-type": "application/json"
          }
    }).then((response) => response.text())
    .then((outText) => document.getElementById('logWindow').innerHTML = outText);

});
