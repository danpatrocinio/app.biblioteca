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
    var carregaClientesAtivos = function() {
        clientesAPI.getClientesAtivos()
        .then(function(response) {
            $scope.clientes = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    $scope.livros = [];
    var carregaLivros = function() {
        livrosAPI.getLivros()
        .then(function(response) {
            $scope.livros = response.data;
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

    $scope.adicionarLivro = function(emprestimo) {
        if (!emprestimo.itens) {
            emprestimo.itens = [];
        }
        if (emprestimo.itens.length >= 3) {
            alert('Número máximo de títulos atingido');
            return;
        }
        var novoItem = { "quantidade" : 1 };
        emprestimo.itens.push(novoItem);
    }
    $scope.removerLivro = function(emprestimo, item) {
        console.log(item);
        emprestimo.itens = emprestimo.itens.filter(function(itemInserido) { 
            return itemInserido !== item;
        })
    }
  
    $scope.removerEmprestimo = function(emprestimoParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        emprestimosAPI.removeEmprestimo(emprestimoParaRemover)
        .then(function(response) {
            carregaEmprestimos();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };
    
    $scope.editarEmprestimo = function(emprestimoParaEditar) {
        $scope.emprestimo = angular.copy(emprestimoParaEditar);
        $scope.emprestimo.dataEmprestimo = convertData(emprestimoParaEditar.dataEmprestimo);
        $scope.emprestimo.dataPrevisaoDevolucao = convertData(emprestimoParaEditar.dataPrevisaoDevolucao);
        $scope.emprestimo.dataDevolucao = convertData(emprestimoParaEditar.dataDevolucao);
    };
    
    var convertData = function(dataLong) {
        if (!dataLong) {
            return;
        }
        return new Date(dataLong);
    } 
    
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregaEmprestimos();
    carregaClientesAtivos();
    carregaLivros();

});