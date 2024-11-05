const express = require('express');
const router = express.Router();
const Product = require('./schema.js'); 
const logger = require("./logger.js");
const mongoose = require('mongoose');

router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); 
        if (products.length === 0) {
            logger.error(`Nenhum produto encontrado`);
            res.status(404).json({ error: 'Nenhum produto encontrado.' });
            return; 
        }
        logger.info(`Exibindo a lista com todos os produtos`);
        res.status(200).json(products);

    } catch (err) {
        logger.error(`Erro ao buscar produtos: ${err}`);
        res.status(500).send('Erro ao buscar produtos.');
    }
});

router.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error(`O ID ${id} é inválido.`);
        return res.status(400).json({ error: 'ID inválido.' });   
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            logger.error(`O produto com ID ${id} não foi encontrado.`);
            return res.status(404).send('Produto não encontrado.');
        }
        logger.info(`Exibindo produto com ID: ${id}.`);
        res.status(200).json(product);
    } catch (err) {
        logger.error(`Erro ao buscar produto: ${err}`);
        res.status(500).send('Erro ao buscar produto.');
    }
});

router.get('/api/products/categoria/:categoria', async (req, res) => {
    const { categoria } = req.params;
    try {
        const products = await Product.find({ categoria });
        if (products.length === 0) {
            logger.error(`Os produtos da categoria ${categoria} não foram encontrados.`);
            return res.status(404).send('Produtos não encontrados.');
        }
        logger.info(`Exibindo os produtos da categoria: ${categoria}.`);
        res.status(200).json(products);
    } catch (err) {
        logger.error(`Erro ao buscar produtos: ${err}`);
        res.status(500).send('Erro ao buscar produtos.');
    }
});

router.post('/api/products', async (req, res) => {
    const {nome, categoria, descricao, quantidade, valor, link } = req.body;
    if (!nome || !categoria || !descricao || !link ||  quantidade === undefined || valor === undefined) {
        logger.error(`Todos os campos são obrigatórios.`);
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    if (typeof nome !== 'string' || typeof categoria !== 'string' || typeof descricao !== 'string' || typeof link !== 'string') {
        logger.error(`Nome, categoria, descrição e o link da imagem devem ser do tipo string.`);
        return res.status(400).json({ error: 'Nome, categoria e descrição devem ser do tipo string.' });
    }
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        logger.error(`Quantidade deve ser um número inteiro maior que zero.`);
        return res.status(400).json({ error: 'Quantidade deve ser um número inteiro maior que zero.' });
    }
    if (typeof valor !== 'number' || valor <= 0) {
        logger.error(`Valor deve ser um número positivo.`);
        return res.status(400).json({ error: 'Valor deve ser um número positivo.' });
    }
    const newProduct = new Product({ nome, categoria, descricao, quantidade, valor, link});
    try {
        await newProduct.save();
        logger.info(`Produto criado com sucesso!`);
        res.status(201).send('Produto criado com sucesso!');
    } catch (err) {
        logger.error(`Erro ao criar produto: ${err}`);
        res.status(500).send('Erro ao criar produto.');
    }
});

router.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error(`O ID ${id} é inválido`);
        return res.status(400).json({ error: 'ID inválido.' });
    }
    const { nome, categoria, descricao, quantidade, valor, link} = req.body;
    if (!nome|| !categoria || !descricao || !categoria || !link|| quantidade === undefined || valor === undefined) {
        logger.error(`Todos os campos são obrigatórios.`);
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { nome, categoria, descricao, quantidade, valor, link },
            { new: true, runValidators: true } 
        );
        if (!updatedProduct) {
            logger.error(`O produto com ID ${id} não foi encontrado.`);
            return res.status(404).send('Produto não encontrado.');
        }
        logger.info(`O produto com ID ${id} foi atualizado com sucesso.`);
        res.status(200).json(updatedProduct);
    } catch (err) {
        logger.error(`Erro ao atualizar produto: ${err}`);
        res.status(500).send('Erro ao atualizar produto.');
    }
});

router.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error(`O ID ${id} é inválido`);
        return res.status(400).json({ error: 'ID inválido.' });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); 
        if (!deletedProduct) {
            logger.error(`O produto com ID ${id} não foi encontrado.`);
            return res.status(404).send('Produto não encontrado.');
        }
        logger.info(`O produto com ID ${id} foi excluído com sucesso.`);
        res.status(200).send('Produto excluído com sucesso.');
    } catch (err) {
        logger.error(`Erro ao excluir produto: ${err}`);
        res.status(500).send('Erro ao excluir produto.');
    }
});

module.exports = router;