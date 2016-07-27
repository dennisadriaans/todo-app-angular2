System.register(['angular2/core', 'angular2/router', '../project/project-list.component', './todo.service', "../pipes/search-pipe"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, project_list_component_1, todo_service_1, search_pipe_1;
    var TodoListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (project_list_component_1_1) {
                project_list_component_1 = project_list_component_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (search_pipe_1_1) {
                search_pipe_1 = search_pipe_1_1;
            }],
        execute: function() {
            TodoListComponent = (function () {
                function TodoListComponent(_todoService) {
                    this._todoService = _todoService;
                    this.newTodo = {};
                    this.today = new Date();
                }
                TodoListComponent.prototype.ngOnInit = function () {
                };
                TodoListComponent.prototype.openAddTodo = function () {
                    this.showTodoInput = true;
                };
                TodoListComponent.prototype.closeAddTodo = function () {
                    this.showTodoInput = false;
                };
                TodoListComponent.prototype.toggleEditTodoWindow = function (index) {
                    var EditBox = document.getElementById('idx-' + index);
                    var closeOverlay = document.getElementById('cpu-' + index);
                    function hasClass(element, cls) {
                        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
                    }
                    if (hasClass(EditBox, 'active')) {
                        closeOverlay.classList.remove('active');
                        EditBox.classList.remove('active');
                    }
                    else {
                        EditBox.classList.toggle('active');
                        closeOverlay.classList.toggle('active');
                    }
                };
                TodoListComponent.prototype.addTodo = function (project, todo) {
                    var _this = this;
                    todo.project_id = project.id;
                    this._todoService
                        .AddTodo(todo)
                        .subscribe(function (todo) { return _this.project.todos.push(todo); });
                    this.ClearInput();
                };
                TodoListComponent.prototype.markDone = function (project, todo) {
                    var _this = this;
                    var index = project.todos.indexOf(todo);
                    var minutes = prompt("Aantal minuten");
                    if (minutes != null) {
                        todo.done = 1;
                        todo.minutes = minutes;
                        this._todoService
                            .updateTodo(project, todo, index)
                            .subscribe(function (todo) { return project.todos.splice(index, 1); }, function (error) { return _this.errorMessage = error; });
                    }
                };
                TodoListComponent.prototype.markPrio = function (project, todo) {
                    var _this = this;
                    var index = project.todos.indexOf(todo);
                    todo.priority = 1;
                    this._todoService
                        .updateTodo(project, todo, index)
                        .subscribe(function (todo) { return todo = todo; }, function (error) { return _this.errorMessage = error; });
                    this.toggleEditTodoWindow(index);
                };
                TodoListComponent.prototype.Delete = function (project, todo) {
                    var _this = this;
                    var index = project.todos.indexOf(todo);
                    this._todoService.Delete(todo.id)
                        .subscribe(function (todo) { return project.todos.splice(index, 1); }, function (error) { return _this.errorMessage = error; });
                    this.newTodo = '';
                };
                TodoListComponent.prototype.ClearInput = function () {
                    this.newTodo = {};
                };
                TodoListComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TodoListComponent.prototype, "project", void 0);
                TodoListComponent = __decorate([
                    core_1.Component({
                        selector: 'tasks',
                        templateUrl: 'templates/todo-list.html',
                        directives: [router_1.ROUTER_DIRECTIVES, project_list_component_1.ProjectListComponent],
                        pipes: [search_pipe_1.SearchPipe],
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.TodoService])
                ], TodoListComponent);
                return TodoListComponent;
            }());
            exports_1("TodoListComponent", TodoListComponent);
        }
    }
});
