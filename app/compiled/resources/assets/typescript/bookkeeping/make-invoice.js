System.register(['angular2/core', 'angular2/http', 'angular2/router', '../todo/todo.service', '../attribute-directives/highlight.directive', "../project/project.service", "../invoice/invoice.service", "../pipes/truncate-pipe", "../pipes/search-pipe", "../pipes/invoiced-pipe"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, todo_service_1, highlight_directive_1, project_service_1, invoice_service_1, truncate_pipe_1, search_pipe_1, invoiced_pipe_1;
    var MakeInvoice;
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
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (highlight_directive_1_1) {
                highlight_directive_1 = highlight_directive_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (invoice_service_1_1) {
                invoice_service_1 = invoice_service_1_1;
            },
            function (truncate_pipe_1_1) {
                truncate_pipe_1 = truncate_pipe_1_1;
            },
            function (search_pipe_1_1) {
                search_pipe_1 = search_pipe_1_1;
            },
            function (invoiced_pipe_1_1) {
                invoiced_pipe_1 = invoiced_pipe_1_1;
            }],
        execute: function() {
            MakeInvoice = (function () {
                function MakeInvoice(params, _projectService, _invoiceService) {
                    this._projectService = _projectService;
                    this._invoiceService = _invoiceService;
                    this.project = {};
                    this.invoiceList = [];
                    this.dateToday = new Date();
                    this.projectId = params.get('id');
                }
                MakeInvoice.prototype.ngOnInit = function () {
                    var _this = this;
                    this._projectService.getProject(this.projectId)
                        .subscribe(function (project) { return _this.project = project; }, function (error) { return _this.errorMessage = error; });
                };
                MakeInvoice.prototype.addTodoInvoiceList = function (project, todo) {
                    this.invoiceList.push(todo);
                    var index = project.todos.indexOf(todo);
                    project.todos.splice(index, 1);
                };
                MakeInvoice.prototype.saveInvoice = function (invoiceList) {
                    var _this = this;
                    console.log(invoiceList);
                    console.log(invoiceList);
                    this._invoiceService.createInvoice(invoiceList)
                        .subscribe(function (invoice) { return _this.closeOverlay(); }, function (error) { return _this.errorMessage = error; });
                };
                MakeInvoice.prototype.closeOverlay = function () {
                    var creator = document.getElementById("invoice-wrapper");
                    creator.className = " invoice-wrapper fadeOutRight animated";
                    setTimeout(function () {
                        creator.className = "";
                    }, 500);
                };
                MakeInvoice = __decorate([
                    core_1.Component({
                        selector: 'make-invoice',
                        templateUrl: 'templates/staging-invoice.html',
                        pipes: [truncate_pipe_1.TruncatePipe, search_pipe_1.SearchPipe, invoiced_pipe_1.InvoicedPipe],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            todo_service_1.TodoService,
                            project_service_1.ProjectService,
                            invoice_service_1.InvoiceService
                        ],
                        directives: [highlight_directive_1.HighlightDirective, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, project_service_1.ProjectService, invoice_service_1.InvoiceService])
                ], MakeInvoice);
                return MakeInvoice;
            }());
            exports_1("MakeInvoice", MakeInvoice);
        }
    }
});
