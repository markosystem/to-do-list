class ToDoController {

    constructor() {
        this._form = document.querySelector("#form-cadastro");
        this._inputNome = document.querySelector("#nome");
        this._inputDescricao = document.querySelector("#descricao");
        this._inputData = document.querySelector("#data");
        this._inputSituacao = document.querySelector("#situacao");

        this._listaToDo = new ListaToDo();
        this._toDoView = new ToDoView(document.querySelector("#contentView"));
        this._toDoView.index();

        var botao_sobre = document.querySelector("#nova-tarefa");
        botao_sobre.addEventListener("click", function () {
            alert("Produzido por Marcos Batista!")
        });
        this.carregarDados();
    }

    adicionarTarefa(event) {
        event.preventDefault();
        this._listaToDo.adiciona(this._criaToDo());
        this._limpaFormulario();
        this.carregarDados();
        alert("Tarefa registrada com sucesso!");
    }

    carregarDados() {
        var dados = this._toDoList();
        var tbody = document.querySelector("#table-body");
        if (dados == null || dados.length == 0) {
            this._limparTabela(tbody);
            return;
        }
        this._preencherTabela(dados, tbody);
    }

    _limparTabela(tbody) {
        let tr = document.createElement("tr");
        tr.classList.add("tarefa");
        let td = document.createElement("td");
        td.setAttribute("colspan", 3);
        td.textContent = "Nenhuma informação foi encontrada!";
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    _preencherTabela(dados, tbody) {

        dados.forEach(function (elemento) {
            let tr = document.createElement("tr");
            tr.classList.add("tarefa");

            let tdNome = document.createElement("td");
            tdNome.textContent = elemento.nome;
            tr.appendChild(tdNome);

            let tdData = document.createElement("td");
            tdData.textContent = DateHelper.dataParaTexto(elemento.data);
            tr.appendChild(tdData);

            let tdAcoes = document.createElement("td");
            tdAcoes.textContent = "<botao>";
            tr.appendChild(tdAcoes);

            tbody.appendChild(tr);
        });
    }

    _criaToDo() {
        return new ToDo(this._inputNome.value,
            this._inputDescricao.value,
            DateHelper.textoParaData(this._inputData.value),
            this._inputSituacao.selectedIndex);
    }

    _toDoList() {
        return this._listaToDo.todos;
    }

    _limpaFormulario() {
        this._form.reset();
        this._inputNome.focus();
    }
}