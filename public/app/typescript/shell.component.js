System.register(['angular2/core', "angular2/http", 'angular2/router', "./tasks/task-list.component", "./tasks/task-detail", "./bookkeeping/make-invoice", "./bookkeeping/bookkeeping.component"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, task_list_component_1, task_detail_1, make_invoice_1, bookkeeping_component_1;
    var ShellComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (task_list_component_1_1) {
                task_list_component_1 = task_list_component_1_1;
            },
            function (task_detail_1_1) {
                task_detail_1 = task_detail_1_1;
            },
            function (make_invoice_1_1) {
                make_invoice_1 = make_invoice_1_1;
            },
            function (bookkeeping_component_1_1) {
                bookkeeping_component_1 = bookkeeping_component_1_1;
            }],
        execute: function() {
            ShellComponent = (function () {
                function ShellComponent() {
                }
                ShellComponent.prototype.ngOnInit = function () {
                };
                ShellComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/shell.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            as: 'Tasks',
                            useAsDefault: true,
                            component: task_list_component_1.default
                        }, {
                            path: '/tasks/:id',
                            as: 'TaskDetail',
                            component: task_detail_1.TaskDetail
                        }, {
                            path: '/bookkeeping/:id',
                            as: 'Bookkeeping',
                            component: bookkeeping_component_1.BookkeepingComponent
                        }, {
                            path: '/bookkeeping/:id/invoice',
                            as: 'MakeInvoice',
                            component: make_invoice_1.MakeInvoice
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ShellComponent);
                return ShellComponent;
            }());
            exports_1("ShellComponent", ShellComponent);
        }
    }
});
