/// <reference path="../../typings/index.d.ts" />

$(function() {
    FastClick.attach(document.body);
});

angular
    .module('main', ['templatecache', 'backend', 'todos', 'shared']);