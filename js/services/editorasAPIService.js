angular.module("app").factory("editorasAPI", function($http, configAPI) {
    var _getEditoras = function() {
        return $http.get(configAPI.resourceEditoras);
    };

    var _saveEditora = function(editora) {
        if (!!editora.idEditora) {
            return $http.put(configAPI.resourceEditoras,editora)
        }
        return $http.post(configAPI.resourceEditoras,editora);
    };

    var _removeEditora = function(editoraParaRemover) {
        var url = configAPI.resourceEditoras + "/" + editoraParaRemover.idEditora;
        return $http.delete(url);
    }

    return {
        getEditoras: _getEditoras,
        saveEditora: _saveEditora,
        removeEditora: _removeEditora
    };
});