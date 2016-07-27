import {Injectable}     from 'angular2/core'
import {Http, Response,
    Headers, RequestOptions}    from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Invoice} from "./invoice";

@Injectable()
export class InvoiceService {
    constructor (private http: Http) {}

    private _invoiceUrl = '/rest/invoice'

    getInvoices() {
        return this.http.get(this._invoiceUrl)
            .map(res => <Invoice[]> res.json())
            .catch(this.handleError);
    }

    getInvoice(id) {
        return this.http.get(this._invoiceUrl + '/' + id)
            .map(res => <Invoice> res.json())
            .catch(this.handleError);
    }

    createInvoice(data: string) : Observable<Invoice> {
        let body = JSON.stringify({ data });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._invoiceUrl, body, options)
            .map(res => <Invoice> res.json())
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}