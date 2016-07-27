import {Component, OnInit}              from '@angular/core';
import {HTTP_PROVIDERS}                 from "angular2/http";
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import taskListComponent from "./tasks/task-list.component";
import {TaskDetail} from "./tasks/task-detail";
import {MakeInvoice} from "./bookkeeping/make-invoice";
import {BookkeepingComponent} from "./bookkeeping/bookkeeping.component";

@Component({
    selector: 'my-app',
    templateUrl: 'templates/shell.html',
    providers: [
        HTTP_PROVIDERS,
    ],
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    {
        path:'/',
        as: 'Tasks',
        useAsDefault: true,
        component: taskListComponent
    },{
        path:'/tasks/:id',
        as: 'TaskDetail',
        component: TaskDetail
    },{
        path:'/bookkeeping/:id',
        as: 'Bookkeeping',
        component: BookkeepingComponent
    },{
        path:'/bookkeeping/:id/invoice',
        as: 'MakeInvoice',
        component: MakeInvoice
    },
])

export class ShellComponent implements OnInit  {

    ngOnInit() {
    }
}
