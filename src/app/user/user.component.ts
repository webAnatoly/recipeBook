import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id = 0;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params.id;
    });
    /*
    params here (this.route.params) is an observable to which we subscribe.

    Observables are constructs to which you subscribe to be informed about the changes in data
    because remember, observables are that stream of data and whenever a new data piece is emitted,
    our subscription will know about it.

    So in this case here, params is the observable, it's a stream of route parameters and that stream
    gives us a new route parameter whenever we go to a new page, whenever that parameter in the URL changes
    and then in callback function we pass to .subscribe(), we get the new params and we can extract our relevant param,
    in this case the ID param.
    */

    /*
    So that how this built-in observable works and how you can think about it,
    params is the observable, it's that stream of data that gives us new values.
    */

    /*
    Now that's all nice and Angular will heavily use such observables
    and there you will never need to create them yourselves, you only subscribe to them, you don't need to create them
    but to understand them, it certainly doesn't hurt to also create them.
    */
  }

  onActivate(): void {
    this.userService.mySubject.next(true);
    // Subject also is an object you can subscribe too but it's more active because you can actively call .next() on it from outside.
  }
}
