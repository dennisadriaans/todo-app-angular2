import {Component, OnInit,Input, Output, Pipe, PipeTransform}               from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS,
    Headers, RequestOptions}    from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams}                        from 'angular2/router';
import {Project}                                                            from "./project";
import {ProjectService}                                                     from './project.service';
import {InvoiceService}                                                     from '../invoice/invoice.service';
import {Observable}                                                         from 'rxjs/Observable';
import {Todo} from "../todo/todo";
import {TruncatePipe} from '../pipes/truncate-pipe';
import {Invoice} from "../invoice/invoice";

@Component({
    templateUrl: 'templates/staging-invoice.html',
    pipes: [TruncatePipe],
    providers: [
        HTTP_PROVIDERS,
        ProjectService,
        InvoiceService
    ],
    directives: [ROUTER_DIRECTIVES]
})

export class ProjectDetailComponent implements OnInit  {

    projectId: string;
    errorMessage: string;
    project: any = {};
    invoiceList: Array<Todo> = [];
    dateToday: Date = new Date();
    response: '';

    constructor (params: RouteParams,
                 private _projectService: ProjectService, private _invoiceService: InvoiceService) {
        this.projectId = params.get('projectId');
    }

    ngOnInit(){
        this._projectService.getProject(this.projectId)
            .subscribe(
                project => this.project = project,
                error =>  this.errorMessage = <any>error);
    }

    addTodoInvoiceList(project, todo) {
        this.invoiceList.push(todo);
        var index = project.todos.indexOf(todo);
        project.todos.splice(index, 1)
    }

    saveInvoice(invoiceList) {
        this._invoiceService.createInvoice(invoiceList)
            .subscribe(
                invoice => console.log(invoice),
                error => this.errorMessage = <any>error);
    }
}