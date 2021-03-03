import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string} = {id: 0, name: 'zero user by default'};

  constructor() { }

  ngOnInit(): void {
  }

}
