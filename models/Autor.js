var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Autores = mongoose.model('Libro');

var autorSchema = new Schema({
    nombre: {type:String},
    apellidos:{type:String},
    nacionalidad:{type:String},
    libros: [{
        type: Schema.Types.ObjectId,
        ref: 'Libro'
    }]
},
{
    versionKey:false
});

module.exports = mongoose.model('Autor', autorSchema);
