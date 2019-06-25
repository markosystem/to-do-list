class ToDo {

    constructor(nome, descricao, situacao) {
        this._nome = nome;
        this._descricao = descricao;
        this._situacao = situacao;
    }

    get nome() {
        return this._nome;
    }
    get descricao() {
        return this._descricao;
    }
    get situacao() {
        return this.situacao;
    }
}