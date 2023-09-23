const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaCheckbox() {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'checkbox');
  return checkbox;
}

function criaLabel() {
  const label = document.createElement('label');
  label.setAttribute('class', 'texto-tarefa');
  label.style.padding = '0px 20px 0px 5px';
  label.style.fontSize = '1rem';
  return label;
}

function criaLi(textoInput) {
  const li = document.createElement('li');
  const checkbox = criaCheckbox();
  li.appendChild(checkbox);

  const label = criaLabel();
  label.innerText = textoInput;
  li.appendChild(label);
  return li;
}

inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoExcluir(li) {
  const botaoExcluir = document.createElement('button');
  botaoExcluir.innerText = 'Excluir';
  botaoExcluir.setAttribute('class', 'excluir');
  botaoExcluir.setAttribute('title', 'Excluir esta tarefa');
  li.appendChild(botaoExcluir);
}

function criaBotaoApagarTodas() {
  const botaoExcluirTodas = document.createElement('button');
  botaoExcluirTodas.innerText = 'Excluir tudo';
  botaoExcluirTodas.setAttribute('class', 'excluir-todas');
  botaoExcluirTodas.setAttribute('title', 'Excluir todas as tarefas');
  const div = document.querySelector('.form');
  div.appendChild(botaoExcluirTodas);
}

function criaTarefa(textoInput) {
  const li = criaLi(textoInput);
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoExcluir(li);
  if (!document.querySelector('.excluir-todas')) {
    criaBotaoApagarTodas();
  }
  salvarTarefas();
}

btnTarefa.addEventListener('click', function (e) {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function (e) {
  const el = e.target;
  if (el.classList.contains('excluir')) {
    el.parentElement.remove();
    salvarTarefas();
    removeBotaoExcluirTodas();
  }
});

document.addEventListener('click', function (e) {
  const el = e.target;
  if (el.classList.contains('excluir-todas')) {
    const liTarefas = tarefas.querySelectorAll('li');
    for (let tarefa of liTarefas) {
      tarefa.remove();
    }
    el.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Excluir', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

tarefas.addEventListener('click', function (e) {
  const el = e.target;
  if (el.type === 'checkbox') {
    const textoTarefa = el.nextSibling;
    if (el.checked) {
      textoTarefa.style.textDecoration = 'line-through';
      textoTarefa.style.color = '#ccc';
    } else {
      textoTarefa.style.textDecoration = 'none';
      textoTarefa.style.color = '#495057';
    }
    salvarTarefas();
  }
});

function removeBotaoExcluirTodas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  if (listaDeTarefas.length === 0) {
    const botaoExcluirTodas = document.querySelector('.excluir-todas');
    botaoExcluirTodas.remove();
  }
}

adicionaTarefasSalvas();
removeBotaoExcluirTodas();
