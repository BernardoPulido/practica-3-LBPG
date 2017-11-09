angular.module('controladores.biblioteca', ['servicios.biblioteca']).controller('LibroController', LibroController);

function LibroController($scope, Libro){
  $scope.titulo = 'Luis Bernardo Pulido Gaytán';

  $scope.libro = {};
  Libro.getLibros();
  $scope.libros = Libro.libros;
  $scope.libros_ind = {};
  $scope.libros_edit = {};


  $scope.addLibro = function () {
      Libro.addLibro($scope.libro);
      $scope.libro = {};
  };
  $scope.showLibro = function (id) {
      Libro.libros_edit={};
      $scope.libro = {};
      Libro.showLibro(id);
      $scope.libro = Libro.libros_edit;
  };
  $scope.getLibros = function(){
        Libro.getLibros();
        $scope.libros = Libro.libros;
  };
  $scope.findLibro = function(id){
        Libro.libros_ind={};
        $scope.libro = {};
        Libro.findLibro(id);
        $scope.libro = Libro.libros_ind;
  };
  $scope.updateLibro = function(libro){
        Libro.updateLibro(libro);
        $scope.libro = {};
  };
  $scope.deleteLibro = function(id){
        Libro.deleteLibro(id);
        $scope.libro = {};
  };
};