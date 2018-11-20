angular.module("app").factory("emprestimosAPI", function($http, configAPI) {
    var _getEmprestimos = function() {
        return $http.get(configAPI.resourceEmprestimos);
    };

    var _saveEmprestimo = function(emprestimo) {
        if (!!emprestimo.idEmprestimo) {
            return $http.put(configAPI.resourceEmprestimos,emprestimo);
        }
        return $http.post(configAPI.resourceEmprestimos,emprestimo);
    };

    var _removeEmprestimo = function(emprestimoParaRemover) {
        var url = configAPI.resourceEmprestimos + "/" + emprestimoParaRemover.idEmprestimo;
        return $http.delete(url);
    }

    return {
        getEmprestimos: _getEmprestimos,
        saveEmprestimo: _saveEmprestimo,
        removeEmprestimo: _removeEmprestimo
    };
});