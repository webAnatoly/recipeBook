import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { MyCustomObservableService } from '../shared/my-custom-observable.service';
// interval() Creates an Observable that emits sequential numbers every specified interval of time
/*
Помним, что по Ctrl+Click на функции можно перейти в её определение и там в комментах документация такая же как и на сайте
https://rxjs.dev/api/index/function/interval
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription!: Subscription;
  private secondObsSubscription!: Subscription;
  /* What is a Subscription?
  A Subscription is an object that represents a disposable resource, usually the execution of an Observable.
  A Subscription has one important method, unsubscribe, that takes no argument
  and just disposes the resource held by the subscription.
  In previous versions of RxJS, Subscription was called "Disposable".
  https://rxjs.dev/guide/subscription
   */

  constructor(private router: Router,
              private myCustomObservable: MyCustomObservableService) { }

  ngOnInit(): void {
    // Будем создавать свой Observable
    /*
    If we want to create a new observable, we need certain features from the RxJS package
    to be precise that RxJS package gives us different ways of creating a new observable
    and one of the easiest ways is the interval method, the interval function.
    */
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log('count:', count);
    });

    // Метод .subscribe() возвращает тип Subscription, который нужен, чтобы отписываться от observable
    // а отписываться иногда нужно, чтобы не было утечки памяти
    /*
    Отписываться от встроенных ангуляровских observables не нужно потому что ангуляр сам от них отписывается.
    For the observables provided by Angular, like params and others, all these Angular observables
    are managed by Angular and therefore, you don't need to unsubscribe manually here, Angular will take care about this.
    */

    this.secondObsSubscription = this.myCustomObservable.myCustomIntervalObservable
      .subscribe(
        (value: number) => {
      console.log('my second new observable', value);
      }, (error) => {
        console.log('впойманая ошибка', error);
      }, () => {
          console.log('Observable завершило :) емитить свои данные ');
        });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe(); // отписываемся при уходе с компонента
    /*
    Если не отписаться, то при уходе с компонента Observable продолжит эмитить события, а при заходе обратно на
    этот компонет он создаст новый Observable, а старый тоже будет работать в памяти и это будет повторяться
    при каждом уходе с компонента.
    Поэтому нужно отписываться.
     */
    this.secondObsSubscription.unsubscribe();
  }
}
