var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();
var models = require('../models/Libro');
var modelsAutor = require('../models/Autor');
var librosCtrl = require('../controllers/LibrosController');
var autoresCtrl = require('../controllers/AutoresController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Práctica 3: Vistas con AngularJS' });
});

router.route('/libros')
  .get(librosCtrl.getLibros)
  .post(upload.array(), librosCtrl.addLibro);

router.route('/libros/:id')
  .get(librosCtrl.getById)
  .put(upload.array(), librosCtrl.updateLibro)
  .delete(librosCtrl.deleteLibro);

router.route('/autores')
  .get(autoresCtrl.getAutores) //Devuelve todos los autores
  .post(upload.array(), autoresCtrl.addAutor); //Agrega nuevo Autor

router.route('/autores/:id')
  .get(autoresCtrl.getById)//Devuelve todos los libros del autor
  .put(upload.array(), autoresCtrl.updateAutor) //Actualizar nombre de autor en los libros
  .delete(autoresCtrl.deleteAutor); //Eliminar libros del autor

router.route('/autores/:id/libros')
    .get(autoresCtrl.getLibrosPorAutor); //Devuelve todos los libros escritos por el autor identificado con ID

module.exports = router;
