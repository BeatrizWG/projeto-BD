const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: [true, 'O nome do produto é obrigatório.'], 
        trim: true, 
    },
    categoria: { 
        type: String, 
        required: [true, 'A Categoria do produto é obrigatória.'], 
        trim: true,
    },    
    descricao: { 
        type: String, 
        required: [false], 
        trim: true,
    },
    quantidade: { 
        type: Number, 
        required: [true, 'A quantidade do produto é obrigatória.'], 
        min: [0, 'A quantidade do produto deve ser maior que zero.'] ,
        validate: {
            validator: Number.isInteger, 
            message: 'A quantidade deve ser um número inteiro.'
        }
    },
    valor: { 
        type: Number, 
        required: [true, 'O valor do produto é obrigatório.'], 
        min: [0, 'O valor do produto deve ser positivo.'] 
    },
    link: {
        type: String,
        required: [true, 'O link do produto é obrigatório.'],
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'O link do produto deve ser uma URL válida.']
    }
});

module.exports = mongoose.model('Product', productSchema);

