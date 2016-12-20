/// <reference path="../../typings/index.d.ts" />

describe("todosCrud.factory works as a layer between api factory and todos controllers", function () {

    var $q;
    var $scope;
    var todosCrudFactory;
    var todosApiFactory;
    var errorHandlerFactory;

    beforeEach(module('todos'));
    beforeEach(module('shared'));

    beforeEach(inject(function (_$q_, _$rootScope_, _todosCrudFactory_, _todosApiFactory_, _errorHandlerFactory_) {
        $q = _$q_;
        $scope = _$rootScope_;
        todosCrudFactory = _todosCrudFactory_;
        todosApiFactory = _todosApiFactory_;
        errorHandlerFactory = _errorHandlerFactory_;
    }));

    it("Should have a getTodos method that forwards the call to todosApiFactory", function () {
        spyOn(todosApiFactory, 'getTodos').and.returnValue($q.defer().promise);
        todosCrudFactory.getTodos();

        expect(todosApiFactory.getTodos).toHaveBeenCalled();
    });

    it("Should have an addTodo method that forward the call to todosApiFactory", function () {
        spyOn(todosApiFactory, 'addTodo').and.returnValue($q.defer().promise);
        var todo = { id: null, text: "" };
        todosCrudFactory.addTodo(todo);

        expect(todosApiFactory.addTodo).toHaveBeenCalledWith(todo);
    });

    it("Should have a deleteTodo method that forwards the call to todosApiFactory", function () {
        spyOn(todosApiFactory, 'deleteTodo').and.returnValue($q.defer().promise);
        todosCrudFactory.deleteTodo(1);

        expect(todosApiFactory.deleteTodo).toHaveBeenCalledWith(1);
    });

    it("Should set the app in an error state if ajax error for get", function () {
        spyOn(errorHandlerFactory, 'setAppHasError');
        spyOn(todosApiFactory, 'getTodos').and.returnValue($q.reject());

        todosCrudFactory.getTodos();

        $scope.$digest();
        expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(true);
    });

    it("Should set the app in an error state if ajax error for addTodo", function () {
        spyOn(errorHandlerFactory, 'setAppHasError');
        spyOn(todosApiFactory, 'addTodo').and.returnValue($q.reject());

        todosCrudFactory.addTodo({ id: null, text: "" });

        $scope.$digest();
        expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(true);
    });

    it("Should set the app in an error state if ajax error for deleteTodo", function () {
        spyOn(errorHandlerFactory, 'setAppHasError');
        spyOn(todosApiFactory, 'deleteTodo').and.returnValue($q.reject());

        todosCrudFactory.deleteTodo(9);

        $scope.$digest();
        expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(true);
    });
});