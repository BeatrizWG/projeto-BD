const express = require('express');
const router = express.Router();
const Product = require('./schema.js'); 
const logger = require("./logger.js");
const mongoose = require('mongoose');

router.get('/api/products/get', async (req, res) => {
    try {
        const products = await Product.find(); 
        if (products.length === 0) {
            res.status(404).json({ error: 'Nenhum produto encontrado.' });
            return; 
        }
        res.status(200).json(products);
    } catch (err) {
        logger.error(`Erro ao buscar produtos: ${err}`);
        res.status(500).send('Erro ao buscar produtos.');
    }
});

router.get('/api/products/get/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.status(200).json(product);
    } catch (err) {
        logger.error(`Erro ao buscar produto: ${err}`);
        res.status(500).send('Erro ao buscar produto.');
    }
});

router.post('/api/products/post', async (req, res) => {
    const {nome, descricao, quantidade, valor } = req.body;
    if (!nome || !descricao || quantidade === undefined || valor === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    if (typeof nome !== 'string' || typeof descricao !== 'string') {
        return res.status(400).json({ error: 'Nome e descrição devem ser do tipo string.' });
    }
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return res.status(400).json({ error: 'Quantidade deve ser um número inteiro não negativo.' });
    }
    if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ error: 'Valor deve ser um número positivo.' });
    }
    const newProduct = new Product({ nome, descricao, quantidade, valor });
    try {
        await newProduct.save();
        res.status(201).send('Produto criado com sucesso!');
    } catch (err) {
        logger.error(`Erro ao criar produto: ${err}`);
        res.status(500).send('Erro ao criar produto.');
    }
});

router.put('/api/products/put/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    const { nome, descricao, quantidade, valor } = req.body;
    if (!nome || !descricao || quantidade === undefined || valor === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { nome, descricao, quantidade, valor },
            { new: true, runValidators: true } 
        );
        if (!updatedProduct) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        logger.error(`Erro ao atualizar produto: ${err}`);
        res.status(500).send('Erro ao atualizar produto.');
    }
});

router.delete('/api/products/delete/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); 
        if (!deletedProduct) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.status(200).send('Produto excluído com sucesso.');
    } catch (err) {
        logger.error(`Erro ao excluir produto: ${err}`);
        res.status(500).send('Erro ao excluir produto.');
    }
});

module.exports = router;