/// AppComponent instead shell
import { bootstrap }    from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
import {ShellComponent} from './shell.component';
import {HTTP_PROVIDERS} from "angular2/http";
import {provide} from 'angular2/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    ROUTER_PROVIDERS
} from 'angular2/router';

bootstrap(ShellComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);


