angular.module("app").controller("autoresController", function($scope, autoresAPI) {

    $scope.tituloApp = "Lista de autores";
    $scope.autores = [];
    var carregarAutores = function() {
        autoresAPI.getAutores()
        .then(function(response) {
            $scope.autores = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };

    $scope.adicionarAutor = function(autor) {
        var novoAutor = angular.copy(autor);
        autoresAPI.saveAutor(novoAutor)
        .then(function(response) {
            delete $scope.autor;
            $scope.autorForm.$setPristine();
            carregarAutores();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };

    $scope.removerAutor = function(autorParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        autoresAPI.removeAutor(autorParaRemover)
        .then(function(response) {
            carregarAutores();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };
    $scope.editarAutor = function(autorParaEditar) {
        $scope.autor = angular.copy(autorParaEditar);
    };
    $scope.temAutorSelecionado = function(autores) {
        return autores.some(function(item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarAutores();
});