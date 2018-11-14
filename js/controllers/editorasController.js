angular.module("app").controller("editorasController", function($scope, editorasAPI) {
    $scope.tituloApp = "Lista de editoras";
    $scope.editoras = [];
    var carregarEditoras = function() {
        editorasAPI.getEditoras()
        .then(function(response) {
            $scope.editoras = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };

    $scope.adicionarEditora = function(editora) {
        var novaEditora = angular.copy(editora);
        editorasAPI.saveEditora(novaEditora)
        .then(function(response) {
            delete $scope.editora;
            $scope.editoraForm.$setPristine();
            carregarEditoras();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };

    $scope.removerEditora = function(editoraParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        editorasAPI.removeEditora(editoraParaRemover)
        .then(function(response) {
            carregarEditoras();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
        });
    };
    $scope.editarEditora = function(editoraParaEditar) {
        $scope.editora = angular.copy(editoraParaEditar);
    };
    $scope.temEditoraSelecionado = function(editoras) {
        return editoras.some(function(item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarEditoras();
});