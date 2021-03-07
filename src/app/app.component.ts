import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isActivated = false;
  private subscription!: Subscription;

  get activated(): boolean {
    return this.isActivated;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.mySubject.subscribe((value: boolean) => {
      this.isActivated = value;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
