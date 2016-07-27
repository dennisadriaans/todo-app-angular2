import {Component, OnInit, Input}              from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams}                        from 'angular2/router';
import {Project} from "../project/project";
import {Todo} from "../todo/todo";
import {TodoService} from "../todo/todo.service";
import {ProjectService} from "../project/project.service";
import {Invoice} from "../invoice/invoice";
import {SearchPipe} from "../pipes/search-pipe";

@Component({
    selector: 'tasks',
    templateUrl: 'templates/tasks.html',
    providers: [ProjectService, TodoService],
    directives: [ROUTER_DIRECTIVES],
    pipes: [SearchPipe],
})

export default class tasksComponent {

    @Input() project;

    // give project a type of project. Also for child property
    selectedProjectId: String;
    showTodoInput: Boolean;
    newTodo: any = {};
    invoiceList: Array<Invoice>;
    showPanel: boolean;
    today: Date;
    errorMessage: string;
    todos: Array<any>;

    constructor (params: RouteParams,
                 private _projectService: ProjectService,
                 private _todoService: TodoService) {
        this.selectedProjectId = params.get('projectId');
        this.today = new Date();
    }

    ngOnInit(){
        if(localStorage.getItem('project')) {
            this.project = JSON.parse(localStorage.getItem('project')
        )};
    }

    openAddTodo() {
        this.showTodoInput = true;
    }

    closeAddTodo() {
        this.showTodoInput = false;
    }

    toggleEditTodoWindow(index) {
        var EditBox = document.getElementById('idx-'+index);
        var closeOverlay = document.getElementById('cpu-'+index);

        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
        if(hasClass(EditBox, 'active')) {
            closeOverlay.classList.remove('active');
            EditBox.classList.remove('active');
        } else {
            EditBox.classList.toggle('active');
            closeOverlay.classList.toggle('active');
        }
    }

    addTodo(project: Project, todo: Todo) {
        todo.project_id = project.id;
        this._todoService
            .AddTodo(todo)
            .subscribe(
                todo => this.project.todos.push(todo));
        this.ClearInput();
    }

    markDone(project, todo) {
        var index = project.todos.indexOf(todo);
        var minutes = prompt("Aantal minuten");

        if (minutes != null) {
            todo.done = 1;
            todo.minutes = minutes;
            this._todoService
                .updateTodo(project, todo, index)
                .subscribe(
                    todo  => project.todos.splice(index, 1),
                    error =>  this.errorMessage = <any>error);
        }

    }

    markPrio(project, todo) {
        var index = project.todos.indexOf(todo);
        todo.priority = 1;
        this._todoService
            .updateTodo(project, todo, index)
            .subscribe(
                todo  => todo = todo,
                error =>  this.errorMessage = <any>error);
        this.toggleEditTodoWindow(index);
    }

    Delete(project, todo) {
        var index = project.todos.indexOf(todo);
        this._todoService.Delete(todo.id)
            .subscribe(
                todo  => project.todos.splice(index, 1),
                error =>  this.errorMessage = <any>error);
        this.newTodo = '';
    }


    private ClearInput() {
        this.newTodo = {};
    }

    stringAsDate(dateStr) {
        return new Date(dateStr);
    }

}