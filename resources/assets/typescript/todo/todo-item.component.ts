import {Component, OnInit,Input, Output, Pipe, PipeTransform}                from 'angular2/core';
import {Http, Response,Headers, RequestOptions,HTTP_PROVIDERS}              from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams}                        from 'angular2/router';
import {Todo}                   from './todo';
import {TodoService}            from './todo.service';
import {HighlightDirective}     from '../attribute-directives/highlight.directive';
import {Observable}             from 'rxjs/Observable';

@Component({
    templateUrl: 'templates/todo-item.html',
    providers: [
        HTTP_PROVIDERS,
        TodoService,
    ],
    directives: [HighlightDirective, ROUTER_DIRECTIVES]
})


export class TodoItemComponent implements OnInit  {

    errorMessage: string;
    currentProject: string;
    selectedTodo: string;
    todo: any = {};

    constructor (params: RouteParams,
                 private _todoService: TodoService) {
        this.currentProject = params.get('projectId');
        this.selectedTodo = params.get('todoId');
    }

    ngOnInit(){
        console.log(this.currentProject);
        this._todoService.GetTodo(this.selectedTodo)
            .subscribe(
                todo => this.todo = todo,
                error =>  this.errorMessage = <any>error);
    }


}