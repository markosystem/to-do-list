class ListaToDo {

    constructor() {
        if (localStorage.getItem("lista-tarefas") == null)
            localStorage.setItem("lista-tarefas", JSON.stringify([]));
        this._toDoAll = JSON.parse(localStorage.getItem("lista-tarefas"));
    }

    adiciona(toDo) {
        var dados = this._toDoAll;
        dados.push(toDo);
        this._toDoAll = localStorage.setItem("lista-tarefas", JSON.stringify(dados));
    }

    get todos() {
        return this._toDoAll;
    }

    get clear() {
        localStorage.clear();
    }

}