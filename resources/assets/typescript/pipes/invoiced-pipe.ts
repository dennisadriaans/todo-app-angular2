import {Pipe} from 'angular2/core';

@Pipe({
    name: 'filterByInvoiced',
    pure: false,
})

export class InvoicedPipe {
    invoiced;

    transform (value, [queryString]) {
        if (value==null) {
            return null;
        }

        return value.filter((todo)=> todo.invoiced == '0')
    }
}