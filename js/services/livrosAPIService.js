angular.module("app").factory("livrosAPI", function($http, configAPI) {
    var _getLivros = function() {
        return $http.get(configAPI.resourceLivros);
    };

    var _saveLivro = function(livro) {
        if (!!livro.idLivro) {
            return $http.put(configAPI.resourceLivros, livro)
        }
        return $http.post(configAPI.resourceLivros,livro);
    };

    var _removeLivro = function(livroParaRemover) {
        var url = configAPI.resourceLivros + "/" + livroParaRemover.idLivro;
        return $http.delete(url);
    }

    return {
        getLivros: _getLivros,
        saveLivro: _saveLivro,
        removeLivro: _removeLivro
    };
});