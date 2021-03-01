import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAnotherHighlight]'
})
export class AnotherHighlightDirective {
  @HostBinding('style.background') background = 'lightyellow';
  @HostBinding('style.padding') padding = '3px 5px';
  @HostBinding('style.borderRadius') borderRadius = '4px';
  @HostBinding('style.border') border = '2px solid transparent';

  @HostListener('mouseenter') mouseover(): void {
    this.border = '2px solid black';
    this.background = 'red';
  }
  @HostListener('mouseleave') mouseleave(): void {
    this.border = '2px solid transparent';
    this.background = 'lightyellow';
  }

  constructor() { }

}
