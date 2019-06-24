class ToDoView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    index() {
        this._elemento.innerHTML = this._template_index();
    }

    _template_index() {
        return `<h2>Tarefas Registradas</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    
                </tbody>
            </table>
        </div>`;
    }
}