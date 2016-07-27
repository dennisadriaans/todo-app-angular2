System.register(['angular2/core', 'angular2/router', '../project/project.service'], function(exports_1, context_1) {
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
    var core_1, router_1, project_service_1;
    var ProjectListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            }],
        execute: function() {
            ProjectListComponent = (function () {
                function ProjectListComponent(_projectService) {
                    this._projectService = _projectService;
                    this.addProjectWindow = false;
                    this.newProject = {};
                    this.currentDate = new Date().toDateString();
                }
                ProjectListComponent.prototype.ngOnInit = function () {
                    this.getProjects();
                    if (localStorage.getItem('lastProject')) {
                        this.selectedProject = JSON.parse(localStorage.getItem('lastProject'));
                    }
                    ;
                };
                ProjectListComponent.prototype.openAddProject = function () {
                    this.addProjectWindow = true;
                };
                ProjectListComponent.prototype.addProject = function (projects, newProject) {
                    var _this = this;
                    this._projectService.addProject(newProject)
                        .subscribe(function (project) { return projects.push(newProject); }, function (error) { return _this.errorMessage = error; });
                };
                ProjectListComponent.prototype.getProjects = function () {
                    var _this = this;
                    this._projectService.getProjects()
                        .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
                };
                ProjectListComponent.prototype.onSelect = function (project) {
                    this.selectedProject = project;
                    localStorage.setItem('lastProject', JSON.stringify(project));
                };
                ProjectListComponent = __decorate([
                    core_1.Component({
                        selector: 'project-list',
                        templateUrl: 'templates/project-list.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [project_service_1.ProjectService]
                    }), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService])
                ], ProjectListComponent);
                return ProjectListComponent;
            }());
            exports_1("ProjectListComponent", ProjectListComponent);
        }
    }
});
