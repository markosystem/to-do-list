class ToDoController {

    constructor() {
        this._form = document.querySelector("#form-cadastro");
        this._inputNome = document.querySelector("#nome");
        this._inputDescricao = document.querySelector("#descricao");
        //this._inputData = document.querySelector("#data");
        this._inputSituacao = document.querySelector("#situacao");

        this._toDoView = new ToDoView(document.querySelector("#contentView"));
        this._toDoView.index();

        var botao_sobre = document.querySelector("#nova-tarefa");
        botao_sobre.addEventListener("click", function () {
            alert("Produzido por Marcos Batista!")
        });
        this._carregarDados();
    }

    _carregarDados() {
        this._listaToDo = new ListaToDo();
        this._preencherTabela(this._listaToDo.todos);
    }

    adicionarTarefa(event) {
        event.preventDefault();
        var msg = this._validarDados();
        if (msg.length == 0) {
            this._listaToDo.adiciona(this._criaToDo());
            this._limpaFormulario();
            alert("Tarefa registrada com sucesso!");
            this._carregarDados();
            return;
        }
        alert("Erro de validação!");
        console.log(msg);
    }

    limparTarefas(event) {
        if (this._listaToDo.todos == null || this._listaToDo.todos.length == 0) {
            alert("Nenhuma tarefa registrada!");
            return;
        }
        var confirmacao = confirm("Tem certeza que deseja apagar as tarefas?");
        if (!confirmacao)
            return;
        event.preventDefault();
        this._listaToDo.clear;
        this._carregarDados();
    }

    _validarDados() {
        var msg = [];
        if (this._inputNome.value == '' || this._inputNome.value.length <= 3)
            msg.push("O campo Nome deve ser informado e conter no mínimo 3 caracteres!");
        if (this._inputDescricao.value == '' || this._inputDescricao.value.length <= 3)
            msg.push("O campo Descrição deve ser informado e conter no mínimo 3 caracteres!");
        var nome = this._inputNome.value;
        this._listaToDo.todos.forEach(function (toDo) {
            if (nome.toUpperCase() == toDo._nome.toUpperCase())
                msg.push("A Tarefa " + nome + " já foi registrada!");
        });
        return msg;
    }

    _preencherTabela(dados) {
        var tbody = document.querySelector("#table-body");
        this._limparTabela(tbody);
        if (dados == null || dados.length == 0) {
            let tr = document.createElement("tr");
            tr.classList.add("tarefa");
            let td = document.createElement("td");
            td.setAttribute("colspan", 3);
            td.textContent = "Nenhuma informação foi encontrada!";
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }
        dados.forEach(function (toDo) {
            let tr = document.createElement("tr");
            tr.classList.add("tarefa");

            let tdNome = document.createElement("td");
            tdNome.textContent = toDo._nome;
            tr.appendChild(tdNome);

            let tdSituacao = document.createElement("td");
            tdSituacao.textContent = toDo._situacao == 0 ? "Aguardando" : toDo._situacao == 1 ? "Feito" : "Cancelado";
            tr.appendChild(tdSituacao);

            /*          let tdData = document.createElement("td");
                        tdData.textContent = DateHelper.dataParaTexto(toDo.data);
                        tr.appendChild(tdData);
             */
            let tdAcoes = document.createElement("td");

            let btAcao = document.createElement("button");
            btAcao.classList.add("btn", "btn-primary", "btn-sm");
            let iconeBt = document.createElement("span");
            iconeBt.setAttribute("data-feather", "circle")
            btAcao.appendChild(iconeBt);
            tdAcoes.appendChild(btAcao);
            tdAcoes.textContent = "View";
            tr.appendChild(tdAcoes);
            tbody.appendChild(tr);
        });
    }

    _criaToDo() {
        return new ToDo(this._inputNome.value,
            this._inputDescricao.value,
            this._inputSituacao.selectedIndex);
    }

    _limpaFormulario() {
        this._form.reset();
        this._inputNome.focus();
    }

    _limparTabela(tbody) {
        tbody.innerHTML = "";
    }
}