import {Component} from '@angular/core';
import {ProjectService} from "../project/project.service";
import {Project} from "../project/project";
import tasksComponent from "./tasks.component";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';

@Component({
    templateUrl: 'templates/task-list.html',
    directives: [ROUTER_DIRECTIVES, tasksComponent],
    providers: [ProjectService]
})

export default class taskListComponent {

    fromRouteParam: string;
    project: Array<Project>;

    constructor(params: RouteParams,  private _projectService: ProjectService) {
        this.fromRouteParam = params.get('message');
    }

    changeProject(project) {
        this.project = project;
        localStorage.setItem('project',  JSON.stringify(project));
    }

    errorMessage: string;
    projects: Project[];
    addProjectWindow = false;
    newProject = {};
    public selectedProject: Object;
    public currentDate: String = new Date().toDateString();

    ngOnInit(){
        this.getProjects();
    }

    openAddProject() {
        alert(123);
        this.addProjectWindow = true;
    }

    addProject(projects, newProject) {
        this._projectService.addProject(newProject)
            .subscribe(
                project => this.projects.push(project),
                error => this.errorMessage = <any>error);
    }

    getProjects() {
        this._projectService.getProjects()
            .subscribe(
                projects => this.projects = projects,
                error => this.errorMessage = <any>error);
    }

    onSelect(project) {
        this.selectedProject = project;
        localStorage.setItem('lastProject',  JSON.stringify(project));
    }
}