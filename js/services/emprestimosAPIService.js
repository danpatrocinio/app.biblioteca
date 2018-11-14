angular.module("app").factory("emprestimosAPI", function($http, configAPI) {
    var _getEmprestimos = function() {
        return $http.get(configAPI.resourceEmprestimos);
    };

    var _saveContato = function(contato) {
        return $http.post(configAPI.resourceEmprestimos,contato);
    };

    var _removeContato = function(contatoParaRemover) {
        var url = configAPI.resourceEmprestimos + "/" + contatoParaRemover.idContato;
        return $http.delete(url);
    }

    return {
        getEmprestimos: _getEmprestimos,
        saveContato: _saveContato,
        removeContato: _removeContato
    };
});