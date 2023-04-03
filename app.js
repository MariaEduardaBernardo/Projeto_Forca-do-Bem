'use strict';

/*Banco de dados*/
let banco = [
];

/*Função para criar os elementos*/
/* Variavel: ${}*/

const criarItem = (text, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status='checked'} data-indice=${indice}>
        <div>${text}</div>
    `
    document.getElementById("todoList").appendChild(item);
}

const limparItem = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const autTela = () => {
    limparItem();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const addItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        banco.push({'tarefa': texto, 'status':''})
        autTela();
    }
}

const autItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : '' ; //? eh entao
    autTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type == 'checkbox') {
        const indice = elemento.dataset.indice;
        autItem (indice);
    }
}

document.getElementById("newItem").addEventListener('keypress',addItem);
document.getElementById("todoList").addEventListener('click', clickItem);
autTela();

/*Página de cadastro*/