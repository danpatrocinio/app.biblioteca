angular.module("app").factory("autoresAPI", function($http, configAPI) {
    var _getAutores = function() {
        return $http.get(configAPI.resourceAutores);
    };

    var _saveAutor = function(autor) {
        if (!!autor.idAutor) {
            return $http.put(configAPI.resourceAutores,autor)
        }
        return $http.post(configAPI.resourceAutores,autor);
    };

    var _removeAutor = function(autorParaRemover) {
        var url = configAPI.resourceAutores + "/" + autorParaRemover.idAutor;
        return $http.delete(url);
    }

    return {
        getAutores: _getAutores,
        saveAutor: _saveAutor,
        removeAutor: _removeAutor
    };
});