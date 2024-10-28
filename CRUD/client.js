async function listarProdutos() {
    try {
        const response = await fetch('http://localhost:5002/api/products/get');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);

        console.log('Lista de produtos:', data);
        // IMPLEMENTAR

    } catch (error) {
        console.error('Erro ao listar produtos:', error);
    }
}

async function listarProdutosCategoria(categoria) {
    try {
        const response = await fetch(`http://localhost:5002/api/products/get/${categoria}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        console.log('Produtos na categoria:', data);
        // IMPLEMENTAR

    } catch (error) {
        console.error('Erro ao listar produtos por categoria:', error);
    }
}

async function buscarProdutoId(id) {
    try {
        const response = await fetch(`http://localhost:5002/api/products/get/${id}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        console.log('Produto encontrado:', data);
       // IMPLEMENTAR

    } catch (error) {
        console.error('Erro ao buscar produto:', error);
    }
}

async function adicionarProduto(produto) {
    try {
        const response = await fetch('http://localhost:5002/api/products/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (!response.ok) throw new Error(await response.text());
        const data = await response.text();

        console.log(data);

        // IMPLEMENTAR
        
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

async function atualizarProduto(id, produto) {
    try {
        const response = await fetch(`http://localhost:5002/api/products/put/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();

        console.log('Produto atualizado:', data);
          // IMPLEMENTAR

    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
    }
}

async function excluirProduto(id) {
    try {
        const response = await fetch(`http://localhost:5002/api/products/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.text();
        console.log(data);

        // IMPLEMENTAR

    } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
}

window.onload = listarProdutos;