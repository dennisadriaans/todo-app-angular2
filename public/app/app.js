System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});

System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});

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
    var ProjectService;
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
            ProjectService = (function () {
                function ProjectService(http) {
                    this.http = http;
                    this._projectsUrl = '/rest/project';
                }
                ProjectService.prototype.getProjects = function () {
                    return this.http.get(this._projectsUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ProjectService.prototype.getProject = function (id) {
                    return this.http.get(this._projectsUrl + '/' + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ProjectService.prototype.addProject = function (data) {
                    var body = JSON.stringify({ data: data });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this._projectsUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ProjectService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ProjectService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], ProjectService);
                return ProjectService;
                var _a;
            }());
            exports_1("ProjectService", ProjectService);
        }
    }
});

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
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], TodoService);
                return TodoService;
                var _a;
            }());
            exports_1("TodoService", TodoService);
        }
    }
});

System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});

System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var SearchPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SearchPipe = (function () {
                function SearchPipe() {
                }
                SearchPipe.prototype.transform = function (value, _a) {
                    var queryString = _a[0];
                    if (value == null) {
                        return null;
                    }
                    return value.filter(function (todo) { return todo.done !== '1'; });
                };
                SearchPipe = __decorate([
                    core_1.Pipe({
                        name: 'filterByDone',
                        pure: false,
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchPipe);
                return SearchPipe;
            }());
            exports_1("SearchPipe", SearchPipe);
        }
    }
});

System.register(['@angular/core', 'angular2/router', "../todo/todo.service", "../project/project.service", "../pipes/search-pipe"], function(exports_1, context_1) {
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
    var core_1, router_1, todo_service_1, project_service_1, search_pipe_1;
    var tasksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (search_pipe_1_1) {
                search_pipe_1 = search_pipe_1_1;
            }],
        execute: function() {
            tasksComponent = (function () {
                function tasksComponent(params, _projectService, _todoService) {
                    this._projectService = _projectService;
                    this._todoService = _todoService;
                    this.newTodo = {};
                    this.selectedProjectId = params.get('projectId');
                    this.today = new Date();
                }
                tasksComponent.prototype.ngOnInit = function () {
                    if (localStorage.getItem('project')) {
                        this.project = JSON.parse(localStorage.getItem('project'));
                    }
                    ;
                };
                tasksComponent.prototype.openAddTodo = function () {
                    this.showTodoInput = true;
                };
                tasksComponent.prototype.closeAddTodo = function () {
                    this.showTodoInput = false;
                };
                tasksComponent.prototype.toggleEditTodoWindow = function (index) {
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
                tasksComponent.prototype.addTodo = function (project, todo) {
                    var _this = this;
                    todo.project_id = project.id;
                    this._todoService
                        .AddTodo(todo)
                        .subscribe(function (todo) { return _this.project.todos.push(todo); });
                    this.ClearInput();
                };
                tasksComponent.prototype.markDone = function (project, todo) {
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
                tasksComponent.prototype.markPrio = function (project, todo) {
                    var _this = this;
                    var index = project.todos.indexOf(todo);
                    todo.priority = 1;
                    this._todoService
                        .updateTodo(project, todo, index)
                        .subscribe(function (todo) { return todo = todo; }, function (error) { return _this.errorMessage = error; });
                    this.toggleEditTodoWindow(index);
                };
                tasksComponent.prototype.Delete = function (project, todo) {
                    var _this = this;
                    var index = project.todos.indexOf(todo);
                    this._todoService.Delete(todo.id)
                        .subscribe(function (todo) { return project.todos.splice(index, 1); }, function (error) { return _this.errorMessage = error; });
                    this.newTodo = '';
                };
                tasksComponent.prototype.ClearInput = function () {
                    this.newTodo = {};
                };
                tasksComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], tasksComponent.prototype, "project", void 0);
                tasksComponent = __decorate([
                    core_1.Component({
                        selector: 'tasks',
                        templateUrl: 'templates/tasks.html',
                        providers: [project_service_1.ProjectService, todo_service_1.TodoService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: [search_pipe_1.SearchPipe],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, project_service_1.ProjectService, todo_service_1.TodoService])
                ], tasksComponent);
                return tasksComponent;
                var _a;
            }());
            exports_1("default", tasksComponent);
        }
    }
});

System.register(['@angular/core', "../project/project.service", "./tasks.component", 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, project_service_1, tasks_component_1, router_1;
    var taskListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (tasks_component_1_1) {
                tasks_component_1 = tasks_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            taskListComponent = (function () {
                function taskListComponent(params, _projectService) {
                    this._projectService = _projectService;
                    this.addProjectWindow = false;
                    this.newProject = {};
                    this.currentDate = new Date().toDateString();
                    this.fromRouteParam = params.get('message');
                }
                taskListComponent.prototype.changeProject = function (project) {
                    this.project = project;
                    localStorage.setItem('project', JSON.stringify(project));
                };
                taskListComponent.prototype.ngOnInit = function () {
                    this.getProjects();
                };
                taskListComponent.prototype.openAddProject = function () {
                    alert(123);
                    this.addProjectWindow = true;
                };
                taskListComponent.prototype.addProject = function (projects, newProject) {
                    var _this = this;
                    this._projectService.addProject(newProject)
                        .subscribe(function (project) { return _this.projects.push(project); }, function (error) { return _this.errorMessage = error; });
                };
                taskListComponent.prototype.getProjects = function () {
                    var _this = this;
                    this._projectService.getProjects()
                        .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
                };
                taskListComponent.prototype.onSelect = function (project) {
                    this.selectedProject = project;
                    localStorage.setItem('lastProject', JSON.stringify(project));
                };
                taskListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'templates/task-list.html',
                        directives: [router_1.ROUTER_DIRECTIVES, tasks_component_1.default],
                        providers: [project_service_1.ProjectService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, project_service_1.ProjectService])
                ], taskListComponent);
                return taskListComponent;
                var _a;
            }());
            exports_1("default", taskListComponent);
        }
    }
});

System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var HighlightDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HighlightDirective = (function () {
                function HighlightDirective(el) {
                    el.nativeElement.style.backgroundColor = 'yellow';
                    this.test();
                }
                HighlightDirective.prototype.test = function () {
                };
                HighlightDirective = __decorate([
                    core_1.Directive({
                        selector: '[myHighLight]'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], HighlightDirective);
                return HighlightDirective;
                var _a;
            }());
            exports_1("HighlightDirective", HighlightDirective);
        }
    }
});

System.register(['@angular/core', '@angular/http', 'angular2/router', '../todo/todo.service', '../attribute-directives/highlight.directive'], function(exports_1, context_1) {
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
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, todo_service_1.TodoService])
                ], TaskDetail);
                return TaskDetail;
                var _a;
            }());
            exports_1("TaskDetail", TaskDetail);
        }
    }
});

System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1;
    var InvoiceService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            InvoiceService = (function () {
                function InvoiceService(http) {
                    this.http = http;
                    this._invoiceUrl = '/rest/invoice';
                }
                InvoiceService.prototype.getInvoices = function () {
                    return this.http.get(this._invoiceUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                InvoiceService.prototype.getInvoice = function (id) {
                    return this.http.get(this._invoiceUrl + '/' + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                InvoiceService.prototype.createInvoice = function (data) {
                    var body = JSON.stringify({ data: data });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this._invoiceUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                InvoiceService.prototype.handleError = function (error) {
                    console.error(error);
                    return Rx_1.Observable.throw(error.json().error || 'Server error');
                };
                InvoiceService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], InvoiceService);
                return InvoiceService;
                var _a;
            }());
            exports_1("InvoiceService", InvoiceService);
        }
    }
});

System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var TruncatePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TruncatePipe = (function () {
                function TruncatePipe() {
                }
                TruncatePipe.prototype.transform = function (value, args) {
                    var limit = args.length > 0 ? parseInt(args[0], 10) : 10;
                    var trail = args.length > 1 ? args[1] : '...';
                    return value.length > limit ? value.substring(0, limit) + trail : value;
                };
                TruncatePipe = __decorate([
                    core_1.Pipe({
                        name: 'truncate'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TruncatePipe);
                return TruncatePipe;
            }());
            exports_1("TruncatePipe", TruncatePipe);
        }
    }
});

System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var InvoicedPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InvoicedPipe = (function () {
                function InvoicedPipe() {
                }
                InvoicedPipe.prototype.transform = function (value, _a) {
                    var queryString = _a[0];
                    if (value == null) {
                        return null;
                    }
                    return value.filter(function (todo) { return todo.invoiced == '0'; });
                };
                InvoicedPipe = __decorate([
                    core_1.Pipe({
                        name: 'filterByInvoiced',
                        pure: false,
                    }), 
                    __metadata('design:paramtypes', [])
                ], InvoicedPipe);
                return InvoicedPipe;
            }());
            exports_1("InvoicedPipe", InvoicedPipe);
        }
    }
});

System.register(['angular2/core', 'angular2/http', 'angular2/router', '../todo/todo.service', '../attribute-directives/highlight.directive', "../project/project.service", "../invoice/invoice.service", "../pipes/truncate-pipe", "../pipes/search-pipe", "../pipes/invoiced-pipe"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, todo_service_1, highlight_directive_1, project_service_1, invoice_service_1, truncate_pipe_1, search_pipe_1, invoiced_pipe_1;
    var MakeInvoice;
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
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (invoice_service_1_1) {
                invoice_service_1 = invoice_service_1_1;
            },
            function (truncate_pipe_1_1) {
                truncate_pipe_1 = truncate_pipe_1_1;
            },
            function (search_pipe_1_1) {
                search_pipe_1 = search_pipe_1_1;
            },
            function (invoiced_pipe_1_1) {
                invoiced_pipe_1 = invoiced_pipe_1_1;
            }],
        execute: function() {
            MakeInvoice = (function () {
                function MakeInvoice(params, _projectService, _invoiceService) {
                    this._projectService = _projectService;
                    this._invoiceService = _invoiceService;
                    this.project = {};
                    this.invoiceList = [];
                    this.dateToday = new Date();
                    this.projectId = params.get('id');
                }
                MakeInvoice.prototype.ngOnInit = function () {
                    var _this = this;
                    this._projectService.getProject(this.projectId)
                        .subscribe(function (project) { return _this.project = project; }, function (error) { return _this.errorMessage = error; });
                };
                MakeInvoice.prototype.addTodoInvoiceList = function (project, todo) {
                    this.invoiceList.push(todo);
                    var index = project.todos.indexOf(todo);
                    project.todos.splice(index, 1);
                };
                MakeInvoice.prototype.saveInvoice = function (invoiceList) {
                    var _this = this;
                    this._invoiceService.createInvoice(invoiceList)
                        .subscribe(function (invoice) { return _this.closeOverlay(); }, function (error) { return _this.errorMessage = error; });
                };
                MakeInvoice.prototype.closeOverlay = function () {
                    var creator = document.getElementById("invoice-wrapper");
                    creator.className = " invoice-wrapper fadeOutRight animated";
                    setTimeout(function () {
                        creator.className = "";
                    }, 500);
                };
                MakeInvoice = __decorate([
                    core_1.Component({
                        selector: 'make-invoice',
                        templateUrl: 'templates/staging-invoice.html',
                        pipes: [truncate_pipe_1.TruncatePipe, search_pipe_1.SearchPipe, invoiced_pipe_1.InvoicedPipe],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            todo_service_1.TodoService,
                            project_service_1.ProjectService,
                            invoice_service_1.InvoiceService
                        ],
                        directives: [highlight_directive_1.HighlightDirective, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, project_service_1.ProjectService, invoice_service_1.InvoiceService])
                ], MakeInvoice);
                return MakeInvoice;
                var _a;
            }());
            exports_1("MakeInvoice", MakeInvoice);
        }
    }
});

System.register(['@angular/core', 'angular2/router', "angular2/http", "../pipes/truncate-pipe", "../project/project.service", "../invoice/invoice.service", "./make-invoice"], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, truncate_pipe_1, project_service_1, invoice_service_1, make_invoice_1;
    var BookkeepingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (truncate_pipe_1_1) {
                truncate_pipe_1 = truncate_pipe_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (invoice_service_1_1) {
                invoice_service_1 = invoice_service_1_1;
            },
            function (make_invoice_1_1) {
                make_invoice_1 = make_invoice_1_1;
            }],
        execute: function() {
            BookkeepingComponent = (function () {
                function BookkeepingComponent(params, _projectService, _invoiceService) {
                    this._projectService = _projectService;
                    this._invoiceService = _invoiceService;
                    this.projectId = +params.get('id');
                }
                BookkeepingComponent.prototype.ngOnInit = function () {
                    this.getInvoices();
                };
                BookkeepingComponent.prototype.createInvoice = function () {
                    var creator = document.getElementById("invoice-wrapper");
                    creator.className += "invoice-wrapper fadeInRight animated";
                };
                BookkeepingComponent.prototype.getInvoices = function () {
                    var _this = this;
                    this._invoiceService.getInvoices()
                        .subscribe(function (invoices) { return _this.invoices = invoices; }, function (error) { return _this.errorMessage = error; });
                };
                BookkeepingComponent.prototype.getProjects = function () {
                    var _this = this;
                    this._projectService.getProjects()
                        .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
                };
                BookkeepingComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/bookkeeping.html',
                        pipes: [truncate_pipe_1.TruncatePipe],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            project_service_1.ProjectService,
                            invoice_service_1.InvoiceService
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES, make_invoice_1.MakeInvoice],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, project_service_1.ProjectService, invoice_service_1.InvoiceService])
                ], BookkeepingComponent);
                return BookkeepingComponent;
                var _a;
            }());
            exports_1("BookkeepingComponent", BookkeepingComponent);
        }
    }
});

System.register(['@angular/core', "angular2/http", 'angular2/router', "./tasks/task-list.component", "./tasks/task-detail", "./bookkeeping/make-invoice", "./bookkeeping/bookkeeping.component"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, task_list_component_1, task_detail_1, make_invoice_1, bookkeeping_component_1;
    var ShellComponent;
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
            function (task_list_component_1_1) {
                task_list_component_1 = task_list_component_1_1;
            },
            function (task_detail_1_1) {
                task_detail_1 = task_detail_1_1;
            },
            function (make_invoice_1_1) {
                make_invoice_1 = make_invoice_1_1;
            },
            function (bookkeeping_component_1_1) {
                bookkeeping_component_1 = bookkeeping_component_1_1;
            }],
        execute: function() {
            ShellComponent = (function () {
                function ShellComponent() {
                }
                ShellComponent.prototype.ngOnInit = function () {
                };
                ShellComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/shell.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            as: 'Tasks',
                            useAsDefault: true,
                            component: task_list_component_1.default
                        }, {
                            path: '/tasks/:id',
                            as: 'TaskDetail',
                            component: task_detail_1.TaskDetail
                        }, {
                            path: '/bookkeeping/:id',
                            as: 'Bookkeeping',
                            component: bookkeeping_component_1.BookkeepingComponent
                        }, {
                            path: '/bookkeeping/:id/invoice',
                            as: 'MakeInvoice',
                            component: make_invoice_1.MakeInvoice
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ShellComponent);
                return ShellComponent;
            }());
            exports_1("ShellComponent", ShellComponent);
        }
    }
});

System.register(['@angular/platform-browser-dynamic', 'rxjs/Rx', './shell.component', "angular2/http", 'angular2/core', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, shell_component_1, http_1, core_1, router_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (_1) {},
            function (shell_component_1_1) {
                shell_component_1 = shell_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(shell_component_1.ShellComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]);
        }
    }
});

System.register(['angular2/core', 'angular2/http', 'angular2/router', './project.service', '../invoice/invoice.service', '../pipes/truncate-pipe'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, project_service_1, invoice_service_1, truncate_pipe_1;
    var ProjectDetailComponent;
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
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (invoice_service_1_1) {
                invoice_service_1 = invoice_service_1_1;
            },
            function (truncate_pipe_1_1) {
                truncate_pipe_1 = truncate_pipe_1_1;
            }],
        execute: function() {
            ProjectDetailComponent = (function () {
                function ProjectDetailComponent(params, _projectService, _invoiceService) {
                    this._projectService = _projectService;
                    this._invoiceService = _invoiceService;
                    this.project = {};
                    this.invoiceList = [];
                    this.dateToday = new Date();
                    this.projectId = params.get('projectId');
                }
                ProjectDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._projectService.getProject(this.projectId)
                        .subscribe(function (project) { return _this.project = project; }, function (error) { return _this.errorMessage = error; });
                };
                ProjectDetailComponent.prototype.addTodoInvoiceList = function (project, todo) {
                    this.invoiceList.push(todo);
                    var index = project.todos.indexOf(todo);
                    project.todos.splice(index, 1);
                };
                ProjectDetailComponent.prototype.saveInvoice = function (invoiceList) {
                    var _this = this;
                    this._invoiceService.createInvoice(invoiceList)
                        .subscribe(function (invoice) { return console.log(invoice); }, function (error) { return _this.errorMessage = error; });
                };
                ProjectDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'templates/staging-invoice.html',
                        pipes: [truncate_pipe_1.TruncatePipe],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            project_service_1.ProjectService,
                            invoice_service_1.InvoiceService
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, project_service_1.ProjectService, invoice_service_1.InvoiceService])
                ], ProjectDetailComponent);
                return ProjectDetailComponent;
                var _a;
            }());
            exports_1("ProjectDetailComponent", ProjectDetailComponent);
        }
    }
});

System.register(['angular2/core', 'angular2/http', 'angular2/router', './todo.service', '../attribute-directives/highlight.directive'], function(exports_1, context_1) {
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
    var TodoItemComponent;
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
            TodoItemComponent = (function () {
                function TodoItemComponent(params, _todoService) {
                    this._todoService = _todoService;
                    this.todo = {};
                    this.currentProject = params.get('projectId');
                    this.selectedTodo = params.get('todoId');
                }
                TodoItemComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log(this.currentProject);
                    this._todoService.GetTodo(this.selectedTodo)
                        .subscribe(function (todo) { return _this.todo = todo; }, function (error) { return _this.errorMessage = error; });
                };
                TodoItemComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'templates/todo-item.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            todo_service_1.TodoService,
                        ],
                        directives: [highlight_directive_1.HighlightDirective, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, todo_service_1.TodoService])
                ], TodoItemComponent);
                return TodoItemComponent;
                var _a;
            }());
            exports_1("TodoItemComponent", TodoItemComponent);
        }
    }
});
