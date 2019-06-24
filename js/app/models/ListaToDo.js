class ListaToDo {

    constructor() {
        this._todo = [];
    }

    adiciona(todo) {
        this._todo.push(todo);
    }

    get todos() {
        return [].concat(this._todo);
    }
}