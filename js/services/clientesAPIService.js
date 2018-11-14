angular.module("app").factory("clientesAPI", function($http, configAPI) {
    var _getClientes = function() {
        return $http.get(configAPI.resourceClientes);
    };

    var _saveCliente = function(cliente) {
        if (!!cliente.idCliente) {
            return $http.put(configAPI.resourceClientes,cliente)
        }
        return $http.post(configAPI.resourceClientes,cliente);
    };

    var _removeCliente = function(clienteParaRemover) {
        var url = configAPI.resourceClientes + "/" + clienteParaRemover.idCliente;
        return $http.delete(url);
    }

    return {
        getClientes: _getClientes,
        saveCliente: _saveCliente,
        removeCliente: _removeCliente
    };
});