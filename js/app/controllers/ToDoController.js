class ToDoController {
    constructor() {
        this._form = document.querySelector("#form-cadastro");
        this._inputNome = document.querySelector("#nome");
        this._inputDescricao = document.querySelector("#descricao");
        //this._inputData = document.querySelector("#data");
        this._inputSituacao = document.querySelector("#situacao");
        this._inputEdicao = document.querySelector("#edicao");

        this._toDoView = new ToDoView(document.querySelector("#contentView"));
        this._toDoView.index();

        var botao_sobre = document.querySelector("#nova-tarefa");
        botao_sobre.addEventListener("click", function () { alert("Desenvolvido por Marcos Batista!") });
        this._carregarDados();
    }

    adicionarTarefa(event) {
        event.preventDefault();
        var msg = this._validarDados();
        if (msg.length == 0) {
            if (this._listaToDo.salvar(this._criaToDo(), this._inputEdicao.value)) {
                this._limpaFormulario();
                alert("Alterações realizadas com sucesso!");
                this._carregarDados();
                return;
            }
            alert("Houve um problema ao Salvar as Alterações!");
            return;
        }
        var msgs = "";
        msg.forEach(function (item) { msgs += item + "\n"; });
        alert("Atenção:\n".concat(msgs));
        this._inputNome.focus();
    }

    editarTarefa(nameTarefa) {
        this._inputEdicao.value = nameTarefa;
        let toDo = this._listaToDo.selecionar(nameTarefa);
        if (toDo != null) {
            this._inputNome.value = toDo._nome;
            this._inputDescricao.value = toDo._descricao;
            this._inputSituacao.selectedIndex = toDo._situacao;
            return;
        }
        alert(`A tarefa '${nomeTarefa}' não foi encontrada!`);
    }

    removerTarefa(nameTarefa) {
        let toDo = this._listaToDo.selecionar(nameTarefa);
        if (toDo != null) {
            if (!confirm(`Tem certeza que deseja remover a tarefa '${nameTarefa}'?`))
                return;
            if (this._listaToDo.remover(toDo)) {
                alert("Tarefa removida com sucesso!");
                this._carregarDados();
                return;
            }
            alert("Houve um problema ao remover a Tarefa, por favor, tente novamente!");
            return;
        }
        alert(`A tarefa '${nomeTarefa}' não foi encontrada!`);
    }

    limparTarefas(event) {
        event.preventDefault();
        if (this._listaToDo.todos.length == 0) {
            alert("Nenhuma tarefa registrada!");
            return;
        }
        if (!confirm("Tem certeza que deseja apagar as tarefas?"))
            return;
        this._listaToDo.clear;
        this._carregarDados();
    }

    _validarDados() {
        var validate = new Validation();
        var msgs = validate.validar(this._criaToDo(), this._inputEdicao.value);
        return msgs;
    }

    _carregarDados() {
        this._listaToDo = new ListaToDo();
        this._preencherTabela(this._listaToDo.todos);
        this._inputEdicao.value = "";
    }

    _preencherTabela(dados) {
        var tbody = document.querySelector("#table-body");
        this._limparTabela(tbody);
        if (dados.length == 0) {
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
            tdNome.classList.add("name-info");
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
            tdAcoes.classList.add("text-center");

            /* Incluindo botao de Visualização */
            let btVisualizar = document.createElement("button");
            btVisualizar.classList.add("btn", "btn-success", "btn-sm", "botao-view");
            btVisualizar.setAttribute("onclick", `toDoController.visualizarTarefa('${toDo._nome}')`);
            btVisualizar.textContent = "Visualizar"
            tdAcoes.appendChild(btVisualizar);

            /* Incluindo botao de Edição */
            let btEditar = document.createElement("button");
            btEditar.classList.add("btn", "btn-primary", "btn-sm", "botao-view");
            btEditar.setAttribute("onclick", `toDoController.editarTarefa('${toDo._nome}')`);
            btEditar.textContent = "Editar"
            tdAcoes.appendChild(btEditar);

            /* Incluindo botao de Exclusão */
            let btRemover = document.createElement("button");
            btRemover.classList.add("btn", "btn-warning", "btn-sm", "botao-view");
            btRemover.setAttribute("onclick", `toDoController.removerTarefa('${toDo._nome}')`);
            btRemover.textContent = "Remover"
            tdAcoes.appendChild(btRemover);

            tr.appendChild(tdAcoes);
            tbody.appendChild(tr);
        });
    }

    visualizarTarefa(nameTarefa) {
        let toDo = this._listaToDo.selecionar(nameTarefa);
        if (toDo != null) {
            alert(this._listaToDo.visualizar(toDo));
            return;
        }
        alert(`A tarefa '${nomeTarefa}' não foi encontrada!`);
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