/// <reference path="../../../node_modules/angular2/typings/browser.d.ts" />
/// AppComponent instead shell
System.register(['angular2/platform/browser', 'rxjs/Rx', './shell.component', "angular2/http", 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, shell_component_1, http_1, router_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (_1) {},
            function (shell_component_1_1) {
                shell_component_1 = shell_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(shell_component_1.ShellComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]);
        }
    }
});
