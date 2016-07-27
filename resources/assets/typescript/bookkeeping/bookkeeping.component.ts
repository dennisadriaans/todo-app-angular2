import {Component, OnInit, Input}              from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams}                        from 'angular2/router';
import {HTTP_PROVIDERS}                 from "angular2/http";
import {TruncatePipe} from "../pipes/truncate-pipe";
import {ProjectService} from "../project/project.service";
import {InvoiceService} from "../invoice/invoice.service";
import {Project} from "../project/project";
import {MakeInvoice} from "./make-invoice";
import {Invoice} from "../invoice/invoice";

@Component({
    selector: 'my-app',
    templateUrl: 'templates/bookkeeping.html',
    pipes: [TruncatePipe],
    providers: [
        HTTP_PROVIDERS,
        ProjectService,
        InvoiceService
    ],
    directives: [ROUTER_DIRECTIVES, MakeInvoice],
})


export class BookkeepingComponent implements OnInit  {

    errorMessage: string;
    projectId: number;
    projects: Project[];
    invoices: Invoice[];

    constructor(params: RouteParams,
                private _projectService: ProjectService,
                private _invoiceService: InvoiceService) {
        this.projectId =+ params.get('id');
    }

    ngOnInit() {
        this.getInvoices();
    }

    createInvoice() {
        var creator = document.getElementById("invoice-wrapper");
        creator.className += "invoice-wrapper fadeInRight animated";
    }

    getInvoices() {
        this._invoiceService.getInvoices()
            .subscribe(
                invoices => this.invoices = invoices,
                error => this.errorMessage = <any>error);
    }

    getProjects() {
        this._projectService.getProjects()
            .subscribe(
                projects => this.projects = projects,
                error => this.errorMessage = <any>error);
    }
}
