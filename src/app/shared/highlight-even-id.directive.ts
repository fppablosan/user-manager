import { Directive, HostBinding, Input } from '@angular/core';


@Directive({
    selector: '[appHighlightEvenId]',
    standalone: true,
})
export class HighlightEvenIdDirective {
    @Input('appHighlightEvenId') set id(val: number | undefined) {
        this.bg = val && val % 2 === 0 ? '#F0F9FF' : 'transparent';
    }


    @HostBinding('style.backgroundColor') bg = 'transparent';
}