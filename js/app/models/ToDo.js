class ToDo {
    
    constructor(nome, descricao, data, situacao) {
        this._nome = nome;
        this._descricao = descricao;
        this._data = new Date(data.getTime());
        this._situacao = situacao;
        this._dataCadastro = new Date();
        this._dataAlteracao = new Date();
        Object.freeze(this);
    }
    
    get nome() {
        return this._nome;
    }
    get descricao() {
        return this._descricao;
    }
    
    get data() {
        return new Date(this._data.getTime());
    }
    
    get situacao() {
        return this._situacao;
    }
    
    get dataCadastro() {
        return new Date(this._dataCadastro.getTime());
    }
    
    get dataAlteracao() {
        return new Date(this._dataAlteracao.getTime());
    }
}