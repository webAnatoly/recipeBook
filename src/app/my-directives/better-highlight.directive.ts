import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

/*  Более правильный подход к стилизации элемента путем создания кастомной атрибутной директивы заключается в стилизации
  элемента не напрямую, а используя ангуляровский класс Renderer2

  Angular is not limited to running in the browser here, it for exampe also works with service workers and these
  are environments where you not have access to the DOM. So if you try to change the DOM as you did here
  in basic-highlight directive by directly accessing the native you might get an error in some circumstances.
  */

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.elRef.nativeElement, 'padding', '5px');
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'black');
    this.renderer.setStyle(this.elRef.nativeElement, 'border-radius', '4px');
    this.renderer.setStyle(this.elRef.nativeElement, 'transition', 'box-shadow .3s ease-out');
  }

  @HostListener('mouseenter') mouseover(eventData: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'box-shadow', `2px 2px 5px 1px rgba(0,0,0,0.5),
    -2px -2px 5px 1px rgba(0,0,0,0.5)`);
  }
  @HostListener('mouseleave') mouseleave(eventData: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'box-shadow', 'none');
  }

  /*
  К слову сказать @HostListener может реагировать не только на встроенные DOM события, но и на кастомные,
  которые можно самому создавать с помощью EventEmitter.
   */
}