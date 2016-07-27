import {Injectable}     from 'angular2/core'
import {Http, Response,
    Headers, RequestOptions}    from 'angular2/http';
import {Todo}           from '../todo/todo';
import {Project}           from './project';
import {Observable}       from 'rxjs/Observable';

@Injectable()
export class ProjectService {
    constructor (private http: Http) {}

    private _projectsUrl = '/rest/project'

    getProjects() {
        return this.http.get(this._projectsUrl)
            .map(res => <Project[]> res.json())
            .catch(this.handleError);
    }

    getProject(id) {
        return this.http.get(this._projectsUrl + '/' + id)
            .map(res => <Project> res.json())
            .catch(this.handleError);
    }

    addProject(data: string) : Observable<Project> {
        let body = JSON.stringify({ data });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._projectsUrl, body, options)
            .map(res => <Project> res.json())
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}