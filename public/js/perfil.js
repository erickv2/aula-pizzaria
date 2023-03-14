// OBJETIVO: mostrar alerta caso o campo de nome
// seja abandonado sem ser preenchido

// 1 - Representar/capturar o campo "nome" p o mundo JS
// document.getElementById
// document.querySelector("#seletor .de css")
// document.querySelectorAll("#seletor .de css")
let inputNome = document.getElementById("nome");
let btDelete = document.getElementById("btDelete")

// 3 - Definir a ação (função) que será executada...
function verificaSeCampoDigitado() {
    if(inputNome.value == ''){
        alert("Preencha o campo nome!");
        inputNome.focus();
    }
}

// 2 - Associar uma ação a ser realizada ao evento
//     "deixou o campo"
inputNome.addEventListener('blur', verificaSeCampoDigitado);


function confirmDelete(event) {
    event.preventDefault()
    confirm("Tem certeza que deseja excluir o item?")

    if(confirm === true){
        window.location = './adm/pizzas/:id/delete'
    }
}

btDelete.addEventListener('click', confirmDelete)

