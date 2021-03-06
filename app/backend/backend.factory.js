/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('backendFactory', function (initialDataFactory, utilsFactory, localstorageFactory) {

        var factory = {};

        var localStorageKey = 'yourTodos';

        var todos;

        if (localstorageFactory.isEmpty(localStorageKey)) {
            todos = initialDataFactory.getTodos();
            localstorageFactory.set(localStorageKey, todos);
        }
        else {
            todos = localstorageFactory.get(localStorageKey);
        }

        factory.getTodos = function () {
            return todos;
        };

        factory.addTodo = function (todo) {
            if (!utilsFactory.isValidNewTodo(todo)) {
                return null;
            }

            todo.id = utilsFactory.getNewId(todos);
            todos.push(todo);

            return todo;
        };

        factory.updateTodo = function (id, todo) {
            if (!utilsFactory.isValidUpdatedTodo(todo)) {
                return null;
            }

            // id is set again with route parameter. See unit test: "Should ignore id in the PUT body since id should be inmutable"
            todo.id = parseInt(id);

            var pos = todos.map(function (tdo) { return tdo.id.toString(); }).indexOf(id.toString());

            if (pos < 0) {
                return undefined;
            }

            todos.splice(pos, 1, todo);
            localstorageFactory.set(localStorageKey, todos);

            return todo;
        };

        factory.deleteTodo = function (id) {
            var match = false;

            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id == id) {
                    match = true;
                    todos.splice(i, 1);
                    break;
                }
            }

            localstorageFactory.set(localStorageKey, todos);

            return match;
        };

        return factory;

    });
