System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var TodoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            TodoService = (function () {
                function TodoService(http) {
                    var _this = this;
                    this.http = http;
                    this._todosUrl = '/rest/todo';
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.updateTodo = function (project, todo, index) {
                        var body = JSON.stringify({ todo: todo });
                        var options = new http_1.RequestOptions({ headers: _this.headers });
                        return _this.http.put(_this._todosUrl + '/' + todo.id, body, options)
                            .map(function (data) { return data.json(); });
                    };
                    this.Delete = function (id) {
                        return _this.http.delete(_this._todosUrl + '/' + id)
                            .do(function (data) { return console.log(data); });
                    };
                }
                TodoService.prototype.GetTodo = function (id) {
                    return this.http.get(this._todosUrl + '/' + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                TodoService.prototype.AddTodo = function (data) {
                    var body = JSON.stringify({ data: data });
                    var options = new http_1.RequestOptions({ headers: this.headers });
                    return this.http.post(this._todosUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                TodoService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TodoService);
                return TodoService;
            }());
            exports_1("TodoService", TodoService);
        }
    }
});
