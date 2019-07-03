class Validation {

    constructor() {
        this._listaToDo = new ListaToDo();
    }

    validar(toDo, nomeEdicao) {
        var errors = [];
        if (toDo._nome == '' || toDo._nome.length <= 3)
            errors.push("O campo Nome deve ser informado e conter no mínimo 3 caracteres!");
        if (toDo._descricao == '' || toDo._descricao.length <= 3)
            errors.push("O campo Descrição deve ser informado e conter no mínimo 3 caracteres!");
        //Inserção
        if (nomeEdicao == '') {
            let toDoExistente = this._listaToDo.selecionar(toDo._nome);
            if (toDoExistente != null)
                errors.push("A tarefa " + toDo._nome + " já existe!");
            return errors;
        }
        //Alteracao
        if (nomeEdicao != toDo._nome) {
            let toDoExistente = this._listaToDo.selecionar(toDo._nome);
            if (toDoExistente != null)
                errors.push("A tarefa " + toDo._nome + " já existe!");
            return errors;
        }
    }

}