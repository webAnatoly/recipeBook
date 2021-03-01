import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnotherHighlight]'
})
export class AnotherHighlightDirective implements OnInit {
  @Input('appAnotherHighlight') bg = 'lightyellow';
  @Input() bgHover = 'red';

  @HostBinding('style.background') background!: string;
  @HostBinding('style.padding') padding!: string;
  @HostBinding('style.borderRadius') borderRadius!: string;
  @HostBinding('style.border') border!: string;

  @HostListener('mouseenter') mouseover(): void {
    this.border = '2px solid black';
    this.background = this.bgHover;
  }
  @HostListener('mouseleave') mouseleave(): void {
    this.border = '2px solid transparent';
    this.background = this.bg;
  }

  ngOnInit(): void {
  this.background = this.bg;
  this.padding = '3px 5px';
  this.borderRadius = '4px';
  this.border = '2px solid transparent';
  }

  constructor() { }

}

/*
custom event binding also works in directives.
 */
