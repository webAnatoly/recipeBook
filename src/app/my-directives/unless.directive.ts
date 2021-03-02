import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/*  Данная директива будет работать как else для случаев когда *ngIf === false  */

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) { // сеттер, помним же что такое сеттер, это вычисляемое свойство.
    // Т.е. это метод, который сработае при попытке перезаписать свойтво объекта.
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      /*
      Создаем View из this.templateRef
      Вопрос на что ссылается this.templateRef. Оно ссылается на <ng-template>.
      Но откуда берется <ng-template>, если мы явно не прописывали в шаблоне этот <ng-template>
      Я думаю ответ таков: Ангуляр, при встрече со структурной директивой сам создает <ng-template>
      Если я не ошибают, так работают встроенные структурные директивы *ngIf и другие, т.е. ангуляр на каком-то этапе парсинга
      создает <ng-template> и потом рендерит это в DOM.

      В этом же примере получается мы сами, как бы говорим ангуляру, что нужно взять this.templateRef (который он создал
      когда мы поместили на элемент нашу директиву *appUnless) и отрендерить этот шаблон в DOM

      this.viewContainerRef.createEmbeddedView(this.templateRef) - т.е. эта строка берет шаблон и рендерит (вставляет) его в дум.
      */
    } else {
      this.viewContainerRef.clear(); // remove everything from this place in the DOM
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    /* templateRef - это ссылка на ангуляровский темплейт <ng-template>
      Represents an embedded template that can be used to instantiate embedded views.
      To instantiate embedded views based on a template, use the ViewContainerRef method createEmbeddedView().

      viewContainerRef - это ссылка на View
      Represents a container where one or more views can be attached to a component.
    */
  }

}
