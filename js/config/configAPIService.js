angular.module("app").value("configAPI", {
    resourceAutores: "http://localhost:8080/api/autores",
    resourceEditoras: "http://localhost:8080/api/editoras",
    resourceLivros: "http://localhost:8080/api/livros",
    resourceClientes: "http://localhost:8080/api/clientes",
    resourceEmprestimos: "http://localhost:8080/api/emprestimos"
});