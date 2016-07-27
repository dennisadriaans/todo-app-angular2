System.register(['angular2/core', "angular2/http", './todo/todo.service', "./project/project.service", './project/project-detail.component', './todo/todo-list.component', "./todo/todo-item.component", 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, http_1, todo_service_1, project_service_1, project_detail_component_1, todo_list_component_1, todo_item_component_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (project_detail_component_1_1) {
                project_detail_component_1 = project_detail_component_1_1;
            },
            function (todo_list_component_1_1) {
                todo_list_component_1 = todo_list_component_1_1;
            },
            function (todo_item_component_1_1) {
                todo_item_component_1 = todo_item_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_projectService) {
                    this._projectService = _projectService;
                    this.addProjectWindow = false;
                    this.newProject = {};
                    this.currentDate = new Date().toDateString();
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getProjects();
                    if (localStorage.getItem('lastProject')) {
                        this.selectedProject = JSON.parse(localStorage.getItem('lastProject'));
                    }
                    ;
                };
                AppComponent.prototype.openAddProject = function () {
                    this.addProjectWindow = true;
                };
                AppComponent.prototype.addProject = function (projects, newProject) {
                    var _this = this;
                    this._projectService.addProject(newProject)
                        .subscribe(function (project) { return projects.push(newProject); }, function (error) { return _this.errorMessage = error; });
                };
                AppComponent.prototype.getProjects = function () {
                    var _this = this;
                    this._projectService.getProjects()
                        .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
                };
                AppComponent.prototype.onSelect = function (project) {
                    this.selectedProject = project;
                    localStorage.setItem('lastProject', JSON.stringify(project));
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/shell.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            project_service_1.ProjectService,
                            todo_service_1.TodoService,
                        ],
                        //directives: [TodoListComponent, ProjectNavigationComponent],
                        directives: [todo_list_component_1.TodoListComponent, router_1.ROUTER_DIRECTIVES],
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'TodoList', component: todo_list_component_1.TodoListComponent },
                        { path: '/project/:projectId', name: 'TodoList', component: todo_list_component_1.TodoListComponent },
                        { path: '/project/:projectId/staging', name: 'ProjectStaging', component: project_detail_component_1.ProjectDetailComponent },
                        { path: '/:projectId/:todoId', name: 'Todo', component: todo_item_component_1.TodoItemComponent }
                    ]), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
