System.register(['angular2/core', 'angular2/http', 'angular2/router', '../todo/todo.service', '../attribute-directives/highlight.directive'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, todo_service_1, highlight_directive_1;
    var TaskDetail;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (highlight_directive_1_1) {
                highlight_directive_1 = highlight_directive_1_1;
            }],
        execute: function() {
            TaskDetail = (function () {
                function TaskDetail(params, _todoService) {
                    this._todoService = _todoService;
                    this.todo = {};
                    this.selectedTodo = params.get('id');
                }
                TaskDetail.prototype.ngOnInit = function () {
                    var _this = this;
                    this._todoService.GetTodo(this.selectedTodo)
                        .subscribe(function (todo) { return _this.todo = todo; }, function (error) { return _this.errorMessage = error; });
                };
                TaskDetail = __decorate([
                    core_1.Component({
                        templateUrl: 'templates/task-detail.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            todo_service_1.TodoService,
                        ],
                        directives: [highlight_directive_1.HighlightDirective, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, todo_service_1.TodoService])
                ], TaskDetail);
                return TaskDetail;
            }());
            exports_1("TaskDetail", TaskDetail);
        }
    }
});
