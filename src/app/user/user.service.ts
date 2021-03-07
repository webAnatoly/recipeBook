import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mySubject = new Subject<boolean>();
  // Subject also is an object you can subscribe too but it's more active because you can actively call .next() on it from outside.

  constructor() { }
}
