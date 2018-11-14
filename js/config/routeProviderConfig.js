angular.module("app").config(AppConfig);

AppConfig.$inject = ['$routeProvider'];
function AppConfig($routeProvider) {
$routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'homeController'
    })
    .when('/autores', {
        templateUrl: 'views/autores.html',
        controller: 'autoresController'
    })
    .when('/editoras', {
        templateUrl: 'views/editoras.html',
        controller: 'editorasController'
    })
    .when('/livros', {
        templateUrl: 'views/livros.html',
        controller: 'livrosController'
    })
    .when('/clientes', {
        templateUrl: 'views/clientes.html',
        controller: 'clientesController'
    })
    .when('/emprestimos', {
        templateUrl: 'views/emprestimos.html',
        controller: 'emprestimosController'
    })
    .otherwise({redirectTo: "/"});
}

