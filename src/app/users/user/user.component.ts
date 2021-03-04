import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string} = {id: 0, name: ''};
  paramsSubscription!: Subscription; /* проперти в котором храним экземпляр Subscription, чтобы можно было потом отписаться
  Вообще-то ангуляр сам отписывается от Observable, которые в него встроены, но если мы создаем сами свой Observable и подписываемся
  на него в компоненте, то нужно подумать и от отписки, чтобы он не висел в памяти. В общем, всё как всегда, зависит от
  ситуации и от задачи. Главное помнить о том, что можно отписываться.

  Этот пример похож на ситуацию с нативным setInterval(); Если мы не вызовем clearInterval(), во время дестроя
  компонента, то он продолжить работать. Опять, же если нам нужно такое поведение, то пусть работает, если нужно убивать его
  вместе с дестроем компонента, то убиваем.
  */

  constructor(private route: ActivatedRoute) { }
  // The ActivatedRoute object we injected will give us access to the id passed in the URL => Selected User

  ngOnInit(): void {
    this.user.id = this.route.snapshot.params.id;
    this.user.name = this.route.snapshot.params.name;

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params.id;
        this.user.name = params.name;
      }
    );

    console.log('this.paramsSubscription', this.paramsSubscription);
/***************** ПРО Observable ******************

    В отличии от this.route.snapshot, который просто объект-"снимок"  this.route.params is observable

    Basically, observable are a feature added by some other third-party package
    (но ангуляр активно их в себя интегрирует, например в EventEmittere и вот в роутере, и в модуле для http запросов, по-моему тоже),
    not by Angular but heavily used by Angular which allow you to easily work with asynchronous tasks и кликанье юзера,
    по кнопке-ссылке является асинхронной операцией because the parameters of your currently loaded route
    might change at some point in the future if the user clicks this links,
    but you don't know when, you didn't know if and you don't know how long it will take.

    So an observable is an easy way to subscribe to some event which might happen in the future,
    to then execute some code when it happens without having to wait for it now

    and that is what router params is. It is such an observable and as the name implies, we can observe it and we
    do so by subscribing to it.

   this.route.params.subscribe(
   (params: Params) => {
          this.user.id = params.id;
          this.user.name = params.name;
        }
   );

  subscribe, если я не ошибаюсь принимает три функции-колбека.
  Вот описание из курса про первый колбек - it'll be fired whenever new data is sent through that observable,
 so to put in easier word, whenever the parameters change in this use case.



*/
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    console.log(' this.paramsSubscription.unsubscribe()',  this.paramsSubscription);
  }
}
