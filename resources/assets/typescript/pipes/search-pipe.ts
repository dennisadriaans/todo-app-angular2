import {Pipe} from 'angular2/core';

@Pipe({
    name: 'filterByDone',
    pure: false,
})

export class SearchPipe {

    transform (value, [queryString]) {
        if (value==null) {
            return null;
        }

        return value.filter((todo)=> todo.done !== '1')
    }
}


