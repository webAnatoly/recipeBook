import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]' // здесь квадратные скобки говорят ангуляру, что это будет атрибутная директива (attribute directive).
  // see more in documentation https://angular.io/api/core/Directive#selector
})
export class BasicHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.borderRadius = '10px';
    this.elementRef.nativeElement.style.padding = '10px';
    this.elementRef.nativeElement.style.backgroundColor = 'lightblue';
  }

}
