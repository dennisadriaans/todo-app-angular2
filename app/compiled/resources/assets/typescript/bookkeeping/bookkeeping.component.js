System.register(['angular2/core', "angular2/http", 'angular2/router', "../pipes/truncate-pipe", "../project/project.service", "../invoice/invoice.service", "./make-invoice"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, truncate_pipe_1, project_service_1, invoice_service_1, make_invoice_1;
    var BookkeepingComponent;
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
            function (truncate_pipe_1_1) {
                truncate_pipe_1 = truncate_pipe_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (invoice_service_1_1) {
                invoice_service_1 = invoice_service_1_1;
            },
            function (make_invoice_1_1) {
                make_invoice_1 = make_invoice_1_1;
            }],
        execute: function() {
            BookkeepingComponent = (function () {
                function BookkeepingComponent(params, _projectService, _invoiceService) {
                    this._projectService = _projectService;
                    this._invoiceService = _invoiceService;
                    this.projectId = +params.get('id');
                }
                BookkeepingComponent.prototype.ngOnInit = function () {
                    this.getInvoices();
                    console.log(this.invoices);
                    console.log(this.invoices);
                    console.log(this.invoices);
                };
                BookkeepingComponent.prototype.createInvoice = function () {
                    var creator = document.getElementById("invoice-wrapper");
                    creator.className += "invoice-wrapper fadeInRight animated";
                };
                BookkeepingComponent.prototype.getInvoices = function () {
                    var _this = this;
                    this._invoiceService.getInvoices()
                        .subscribe(function (invoices) { return _this.invoices = invoices; }, function (error) { return _this.errorMessage = error; });
                };
                BookkeepingComponent.prototype.getProjects = function () {
                    var _this = this;
                    this._projectService.getProjects()
                        .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
                };
                BookkeepingComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/bookkeeping.html',
                        pipes: [truncate_pipe_1.TruncatePipe],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            project_service_1.ProjectService,
                            invoice_service_1.InvoiceService
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES, make_invoice_1.MakeInvoice],
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, project_service_1.ProjectService, invoice_service_1.InvoiceService])
                ], BookkeepingComponent);
                return BookkeepingComponent;
            }());
            exports_1("BookkeepingComponent", BookkeepingComponent);
        }
    }
});
