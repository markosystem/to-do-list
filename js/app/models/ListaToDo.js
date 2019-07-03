class ListaToDo {

    constructor() {
        if (localStorage.getItem("lista-tarefas") == null)
            localStorage.setItem("lista-tarefas", JSON.stringify([]));
        this._toDoAll = JSON.parse(localStorage.getItem("lista-tarefas"));
    }

    selecionar(nomeTarefa) {
        var tarefa = null;
        var dados = this._toDoAll;
        dados.forEach(function (d) {
            if (nomeTarefa === d._nome) {
                tarefa = d;
                return;
            }
        });
        return tarefa;
    }

    visualizar(toDo) {
        return ''.concat(`Visualização da Tarefa: ${toDo._nome}\n`, `Descrição: ${toDo._descricao}\n`, `Situação: ${toDo._situacao == 0 ? 'Aguardando' : toDo._situacao == 1 ? 'Feito' : 'Cancelado'}`);
    }

    salvar(toDo, nomeEdicao) {
        var dados = this._toDoAll;
        //Inserção
        if (nomeEdicao == '') {
            dados.push(toDo);
            this._toDoAll = localStorage.setItem("lista-tarefas", JSON.stringify(dados));
            return true;
        }
        //Alteração
        for (var i = 0; i < dados.length; i++) {
            if (nomeEdicao === dados[i]._nome) {
                dados[i] = toDo;
            }
        }
        this._toDoAll = localStorage.setItem("lista-tarefas", JSON.stringify(dados));
        return true;
    }

    remover(toDo) {
        var rem = false;
        var dados = this._toDoAll;
        for (var i = 0; i < dados.length; i++) {
            if (dados[i] === toDo) {
                dados.splice(i, 1);
                rem = true;
            }
        }
        this._toDoAll = localStorage.setItem("lista-tarefas", JSON.stringify(dados));
        return rem;
    }

    get todos() {
        return this._toDoAll;
    }

    get clear() {
        localStorage.clear();
    }

}