import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
    selector: '[myHighLight]'
})

export class HighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
        this.test();
    }

    public test() {
    }

    // get current element position
    // make new view
    // display view with position values as mentioned as above.

}