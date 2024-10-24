const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: [true, 'O nome do produto é obrigatório.'], 
        trim: true, 
    },
    descricao: { 
        type: String, 
        required: [true, 'A descrição do produto é obrigatória.'], 
        trim: true,
    },
    quantidade: { 
        type: Number, 
        required: [true, 'A quantidade do produto é obrigatória.'], 
        validate: {
            validator: Number.isInteger, 
            message: 'A quantidade deve ser um número inteiro.'
        }
    },
    valor: { 
        type: Number, 
        required: [true, 'O valor do produto é obrigatório.'], 
        min: [0, 'O valor do produto deve ser positivo.'] 
    }
});

module.exports = mongoose.model('Product', productSchema);

