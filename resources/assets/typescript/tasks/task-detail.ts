import {Component, OnInit}               from '@angular/core';
import {HTTP_PROVIDERS}              from '@angular/http';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import {TodoService}            from '../todo/todo.service';
import {HighlightDirective}     from '../attribute-directives/highlight.directive';

@Component({
    templateUrl: 'templates/task-detail.html',
    providers: [
        HTTP_PROVIDERS,
        TodoService,
    ],
    directives: [HighlightDirective, ROUTER_DIRECTIVES]
})


export class TaskDetail implements OnInit  {

    errorMessage: string;
    currentProject: string;
    selectedTodo: string;
    todo: any = {};

    constructor (params: RouteParams,
                 private _todoService: TodoService) {
        this.selectedTodo = params.get('id');
    }

    ngOnInit(){
        this._todoService.GetTodo(this.selectedTodo)
            .subscribe(
                todo => this.todo = todo,
                error =>  this.errorMessage = <any>error);
    }


}