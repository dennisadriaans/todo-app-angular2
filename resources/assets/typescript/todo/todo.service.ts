import {Injectable}             from 'angular2/core'
import {Http, Response,
    Headers, RequestOptions}    from 'angular2/http';
import {Todo}                   from './todo';
import {Observable}             from 'rxjs/Observable';

@Injectable()
export class TodoService {
    constructor (private http: Http) {}

    private _todosUrl = '/rest/todo';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    GetTodo(id) {
        return this.http.get(this._todosUrl + '/' + id)
            .map(res =>  <Todo> res.json())
            .catch(this.handleError);
    }

    AddTodo (data: Todo) : Observable<Todo>  {
        let body = JSON.stringify({ data });
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this._todosUrl, body, options)
            .map(res =>  <Todo> res.json())
            .catch(this.handleError)
    }

    updateTodo = (project: string, todo, index: number): Observable<Response> => {

        let body = JSON.stringify({todo});
        let options = new RequestOptions({ headers: this.headers });

        return this.http.put(this._todosUrl+'/'+todo.id, body, options)
            .map(data => data.json());
    }

    Delete = (id: number): Observable<Response> => {
        return this.http.delete(this._todosUrl+ '/' + id)
            .do(data => console.log(data));
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}