var mongoose = require('mongoose');

var Libros = mongoose.model('Libro');

exports.getLibros = function(req, res, next){
  Libros.find(function (err, libros) {
      if(err){
          res.status(500).jsonp({error:'500', descrip:err.message});
      }else{
          console.log('GET /libros');
          res.status(200).jsonp(libros);
      }
  });
};

exports.addLibro = function(req, res, next){
    console.log('POST /libros');
    var libro = new Libros({
        titulo :req.body.titulo,
        anio : req.body.anio,
        autor : req.body.autor,
        genero : req.body.genero
    });

    libro.save(function (err, libro) {
        if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
        Libros.findById(libro._id, function (err, libro) {
            if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
            res.status(200).jsonp(libro);
        })
    });
};

exports.getById = function(req, res, next){
    Libros.findById(req.params.id, function (err, libro) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }
        if(libro){
            console.log('GET /libros:id');
            return res.status(200).jsonp(libro);
        }else{
            return res.status(500).jsonp({error:'500', descrip:"Libro no existente"});
        }
    });
};

exports.updateLibro = function(req, res, next){
    /**
     * Modificar registro libro, proporcionando los datos correspondientes.
     */
    console.log('PUT /libros/:id');
    console.log(req.params.id);
    console.log(req.body);

    Libros.findById(req.params.id,function (err, libro) {
        if(err){
            res.status(500).jsonp({error:'500', descrip:err.message});
        }else{
            req.body.titulo?libro.titulo = req.body.titulo:null;
            req.body.autor?libro.autor = req.body.autor:null;
            req.body.anio?libro.anio = req.body.anio:null;
            req.body.genero?libro.genero = req.body.genero:null;

            libro.save(function (err, libro) {
                if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
                Libros.find(function (err, libro) {
                    if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
                    res.status(200).jsonp(libro);
                })
            });

        }
    });
};
exports.deleteLibro = function(req, res, next){
    /**
     * Eliminar registro libro de "base de datos";
     */
    console.log('DELETE /libros/:id');
    console.log(req.params.id);

    Libros.findByIdAndRemove(req.params.id, function (err, libro) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:'Recurso no existente'});
        }else{
            //res.status(200).jsonp(libro);
            Libros.find(function (err, libro) {
                if(err) return res.status(500).jsonp({error:'500', descrip:'Recurso no existente'});
               return res.status(200).jsonp(libro);
            });
        }
    });
};