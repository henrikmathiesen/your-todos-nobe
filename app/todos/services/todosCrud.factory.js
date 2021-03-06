/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosCrudFactory', function ($q, todosApiFactory, errorHandlerFactory) {

        var factory = {};

        var onError = function () {
            errorHandlerFactory.setAppHasError(true);
            return $q.reject(); // stops the promise chain to todosCrudFactory.xxx().then() (in yt-todos.directive) , .catch() will however run (this logic also applies to $q.all()...)
        }

        var onSuccess = function (response) {
            return response.data;
        };

        factory.getTodos = function () {
            return todosApiFactory.getTodos()
                .then(onSuccess)
                .catch(onError);
        };

        factory.addTodo = function (todo) {
            return todosApiFactory.addTodo(todo)
                .then(onSuccess)
                .catch(onError);
        };

        factory.updateTodo = function (todo) {
            var todoToUpdate = { id: todo.id, text: todo.text };

            return todosApiFactory.updateTodo(todoToUpdate)
                .then(onSuccess)
                .catch(onError);
        };

        factory.deleteTodo = function (id) {
            return todosApiFactory.deleteTodo(id)
                .then(onSuccess)
                .catch(onError);
        };

        return factory;

    });
