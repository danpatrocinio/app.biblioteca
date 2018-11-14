angular.module("app").controller("livrosController", function($scope, livrosAPI, editorasAPI, autoresAPI) {
    $scope.tituloApp = "Lista de livros";
    $scope.livros = [];
    var carregaLivros = function() {
        livrosAPI.getLivros()
        .then(function(response) {
            $scope.livros = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };
    $scope.editoras = [];
    var carregaEditoras = function() {
        editorasAPI.getEditoras()
        .then(function(response) {
            $scope.editoras = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    $scope.autores = [];
    var carregaAutores = function() {
        autoresAPI.getAutores()
        .then(function(response) {
            $scope.autores = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    $scope.adicionarLivro = function(livro) {
        var novoLivro = angular.copy(livro);
        livrosAPI.saveLivro(novoLivro)
        .then(function(response) {
            delete $scope.livro;
            $scope.livroForm.$setPristine();
            carregaLivros();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };

    $scope.removerLivro = function(livroParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        livrosAPI.removeLivro(livroParaRemover)
        .then(function(response) {
            carregaLivros();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };
    $scope.editarLivro = function(livroParaEditar) {
        $scope.livro = angular.copy(livroParaEditar);
    };
    $scope.temLivroSelecionado = function(livros) {
        return livros.some(function(item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregaLivros();
    carregaEditoras();
    carregaAutores();
});