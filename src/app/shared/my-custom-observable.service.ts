import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCustomObservableService {

  myCustomIntervalObservable!: Observable<number>;

  constructor() {
    // В качестве тренировки создаем свой observable вызовом статического метода .create() класса Observable
    // метод create() вроде как деприкейтед, но ради тренировки попробуем и так и так посоздавать.
    this.myCustomIntervalObservable = new Observable((observer: any) => {
      /* Observer - The observer, in the end, is a part that is interested in being informed about new data,
      about errors, or about the observable being completed.

      Now our job here is to tell the observer about new data, about an error or about the observable being completed.

      Here, we're not responsible for listening because the observer is the listener,
      here we get that listening part as an argument and we need to tell it once we're done,
      once new data is there and so on.

      So in this anonymous function, we can now use the regular set setInterval method.

      */
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 3) { // пример вызова метода observer.complete() - этот метод завершает работу обсервера
          observer.complete(); // when we call complete, the observable will really come to a halt
          // that is important to understand and to keep in mind,
          // whenever an observable completes, it really is done, there are no other values emitted.
        }
        if (count > 4) {
          observer.error(new Error('Count is greater than ' + count)); // имитация ошибки
          // whenever an observable throws an error, it cancels, it's done, it will not emit any other value,
          // it dies so to say and therefore in that case, you also don't need to unsubscribe.
        }
        count += 1;
        // We can call next here to emit a new value.
        // The observer has a couple of important methods next(), error(), complete()
      }, 1000);
    });
  }
}
