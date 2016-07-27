System.register(['angular2/core', 'angular2/http', '../project/project.service'], function(exports_1, context_1) {
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
    var core_1, http_1, project_service_1;
    var ProjectNavigationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            }],
        execute: function() {
            ProjectNavigationComponent = (function () {
                function ProjectNavigationComponent(_projectService) {
                    this._projectService = _projectService;
                    this.projectId = '';
                }
                ProjectNavigationComponent.prototype.getProjects = function () {
                    var _this = this;
                    this._projectService.getProjects()
                        .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
                };
                ProjectNavigationComponent.prototype.ngOnInit = function () {
                    this.getProjects();
                };
                ProjectNavigationComponent = __decorate([
                    core_1.Component({
                        selector: 'project-navigation',
                        templateUrl: 'templates/project-navigation.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            project_service_1.ProjectService,
                        ]
                    }), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService])
                ], ProjectNavigationComponent);
                return ProjectNavigationComponent;
            }());
            exports_1("ProjectNavigationComponent", ProjectNavigationComponent);
        }
    }
});
