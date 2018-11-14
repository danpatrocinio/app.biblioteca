angular.module("app").controller("emprestimosController", function($scope, emprestimosAPI, livrosAPI, clientesAPI) {
    $scope.tituloApp = "Lista de emprestimos";
    $scope.emprestimos = [];
    var carregaEmprestimos = function() {
        emprestimosAPI.getEmprestimos()
        .then(function(response) {
            $scope.emprestimos = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    $scope.clientes = [];
    var carregaClientes = function() {
        clientesAPI.getClientes()
        .then(function(response) {
            $scope.clientes = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    $scope.adicionarEmprestimo = function(emprestimo) {
        var novoEmprestimo = angular.copy(emprestimo);
        emprestimosAPI.saveEmprestimo(novoEmprestimo)
        .then(function(response) {
            delete $scope.emprestimo;
            $scope.emprestimoForm.$setPristine();
            carregaEmprestimos();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
  
    $scope.removerEmprestimo = function(emprestimoParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        emprestimosAPI.removeLivro(emprestimoParaRemover)
        .then(function(response) {
            carregaLivros();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };
    
    $scope.editarEmprestimo = function(emprestimoParaEditar) {
        $scope.emprestimo = angular.copy(emprestimoParaEditar);
    };
    $scope.temEmprestimoSelecionado = function(emprestimos) {
        return emprestimos.some(function(item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregaEmprestimos();
    carregaClientes();
});