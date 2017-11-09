var mongoose = require('mongoose');

var Autores = mongoose.model('Autor');
var Libros = mongoose.model('Libro');

exports.getAutores = function(req, res, next){
    /**
     * Obtener todos los autores registrados en la base de
     datos.
     */
    console.log('GET /autores');
    Autores.find(function (err, autores) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }else{
            res.status(200).jsonp(autores);
        }
    });
};

exports.addAutor = function(req, res, next){
    /**
     * Crear un nuevo autor en la base de datos
     */
    console.log('POST /autores');
    var autor = new Autores({
        nombre :req.body.nombre,
        apellidos : req.body.apellidos,
        nacionalidad : req.body.nacionalidad,
    });

    autor.save(function (err, autors) {
        if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
        res.status(200).jsonp(autors);
    });
};

exports.getById = function(req, res, next){
    /**
     Obtener el autor identificado con el ID. En caso de no
     encontrar el autor, retornar un objeto JSON con un
     código y descripción del error.
     */

    console.log('GET /autores:id');

    Autores.findById(req.params.id, function (err, autor) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }
        if(autor){
            Libros.find({'autor':req.params.id}, function (err, libro) {
                if(err){
                    return res.status(500).jsonp({error:'500', descrip:err.message});
                }else{
                    autor.libros=libro;
                    return res.status(200).jsonp(autor);
                }
            });
        }else{
            return res.status(500).jsonp({error:'500', descrip:"Autor no existente"});
        }
    });
};

exports.updateAutor = function (req, res, next) {
    /**
     * Actualizar el nombre del autor identificado con el ID. El
     método debe de regresar el registro actualizado. En
     caso de no encontrar libros del autor, retornar un
     objeto JSON con un código y descripción del error.
     */
    console.log('PUT /autores/:id');
    console.log(req.params.id);
    console.log(req.body);


    Libros.find({'autor':req.params.id}, function (err, libro) {
       if(libro.length>0){
           Autores.findById(req.params.id,function (err, autor) {
               if(err){
                   res.status(500).jsonp({error:'500', descrip:err.message});
               }else{
                   req.body.nombre?autor.nombre = req.body.nombre:null;
                   req.body.apellidos?autor.apellidos = req.body.apellidos:null;
                   req.body.nacionalidad?autor.nacionalidad = req.body.nacionalidad:null;

                   autor.save(function (err, autor) {
                       if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
                       Libros.find({'autor':req.params.id}, function (err, libro) {
                           if(err){
                               return res.status(500).jsonp({error:'500', descrip:err.message});
                           }else{
                               autor.libros=libro;
                               return res.status(200).jsonp(autor);
                           }
                       });
                   });
               }
           });
       }else{
           return res.status(500).jsonp({error:'500', descrip:"No existen libros del autor ingresado."});
       }
    });
};
exports.deleteAutor = function(req, res, next){
    /**
     * Eliminar todos los libros que se encuentren
     relacionaciodos con el autor (ID). El método debe de
     regresar todos los registros eliminados. En caso de no
     encontrar autor, retornar un objeto JSON con un
     código y descripción del error.
     */
    console.log('DELETE /autores/:id');
    console.log(req.params.id);

    var libro_conjunto =[];
    Libros.find({'autor':req.params.id}, function (err, libro) {
        libro_conjunto =libro;
    });

    Autores.findById(req.params.id, function (err, autor) {
       if(err || !autor){
           return res.status(500).jsonp({error:'505', descrip:"Registro no existente."});
       }else{
           Libros.find({'autor':req.params.id}).remove().exec(function (err, libro) {
               Autores.findByIdAndRemove(req.params.id, function (err, autor) {
                   if(err){
                       return res.status(500).jsonp({error:'500', descrip:err.message});
                   }else{
                       autor.libros = libro_conjunto;
                       res.status(200).jsonp(autor);
                   }
               });
           });
       }
    });
};

exports.getLibrosPorAutor = function (req, res, next) {
    /**
     * Obtener todos los libros escritos por el autor
     identificado con ID.
     */
    console.log('GET /autores/:id/libros');

    Autores.findById(req.params.id, function (err, autor) {
        if(err || !autor){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }else{
            Libros.find({'autor':req.params.id}, function (err, libro) {
                if(err){
                    return res.status(500).jsonp({error:'500', descrip:err.message});
                }else{
                    autor.libros=libro;
                    if(libro.length==0){
                        return res.status(500).jsonp({error:'500', descrip:"Actualmente el autor no cuenta con libros."});
                    }else{
                        return res.status(200).jsonp(libro);
                    }

                }
            });
        }
    });

};

