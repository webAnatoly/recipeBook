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
        count += 1;
        // We can call next here to emit a new value.
        // The observer has a couple of important methods next(), error(), complete()
      }, 1000);
    });
  }
}
