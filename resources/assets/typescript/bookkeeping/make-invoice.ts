import {Component, OnInit,Input, Output, Pipe, PipeTransform}                from 'angular2/core';
import {Http, Response,Headers, RequestOptions,HTTP_PROVIDERS}              from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams}                        from 'angular2/router';
import {Todo}                   from '../todo/todo';
import {TodoService}            from '../todo/todo.service';
import {HighlightDirective}     from '../attribute-directives/highlight.directive';
import {Observable}             from 'rxjs/Observable';
import {ProjectService} from "../project/project.service";
import {InvoiceService} from "../invoice/invoice.service";
import {TruncatePipe} from "../pipes/truncate-pipe";
import {SearchPipe} from "../pipes/search-pipe";
import {InvoicedPipe} from "../pipes/invoiced-pipe";

@Component({
    selector: 'make-invoice',
    templateUrl: 'templates/staging-invoice.html',
    pipes: [TruncatePipe, SearchPipe, InvoicedPipe],
    providers: [
        HTTP_PROVIDERS,
        TodoService,
        ProjectService,
        InvoiceService
    ],
    directives: [HighlightDirective, ROUTER_DIRECTIVES]
})


export class MakeInvoice implements OnInit  {

    projectId: string;
    errorMessage: string;
    project: any = {};
    invoiceList: Array<Todo> = [];
    dateToday: Date = new Date();
    response: '';

    constructor (params: RouteParams,
                 private _projectService: ProjectService, private _invoiceService: InvoiceService) {
        this.projectId = params.get('id');
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
                invoice => this.closeOverlay(),
                error => this.errorMessage = <any>error);
    }

    closeOverlay() {
        var creator = document.getElementById("invoice-wrapper");
        creator.className = " invoice-wrapper fadeOutRight animated";

        setTimeout(function() {
            creator.className = "";
        }, 500)
    }

}