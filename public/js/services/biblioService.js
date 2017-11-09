angular.module('servicios.biblioteca', [])
            .factory('Libro', Libro);

function Libro($http) {
    var l = {
        libros : [],
        libros_ind : [],
        libros_edit : []
    };
    l.getLibros = function(){
        return $http.get('/libros')
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, l.libros);
            }, function(res){
                console.log(res.statusText);
            });
    };

    l.addLibro = function(nuevo){
        return $http.post('/libros', nuevo)
            .then(function (res) {
                l.libros.push(res.data);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    l.findLibro = function(id){
        return $http.get('/libros/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, l.libros_ind);
            }, function(res){
                console.log(res.statusText);
            });
    };
    l.showLibro = function(id){
        return $http.get('/libros/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, l.libros_edit);
            }, function(res){
                console.log(res.statusText);
            });
    };

    l.updateLibro = function(actualizado){
        if(actualizado._id!==undefined){
            return $http.put('/libros/'+actualizado._id, actualizado)
                .then(function (res) {
                    angular.copy(res.data, l.libros);
                }, function (res) {
                    console.log(res.statusText);
                });
        }
    };
    l.deleteLibro = function(id){
        return $http.delete('/libros/'+id)
            .then(function (res) {
                angular.copy(res.data, l.libros);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    return l;
};