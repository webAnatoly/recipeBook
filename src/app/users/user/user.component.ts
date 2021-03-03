import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string} = {id: 0, name: ''};

  constructor(private route: ActivatedRoute) { }
  // The ActivatedRoute object we injected will give us access to the id passed in the URL => Selected User

  ngOnInit(): void {
    // this.user = {
    //   id: this.route.snapshot.params.id,
    //   name: this.route.snapshot.params.name,
    // };
    this.user.id = this.route.snapshot.params.id;
    this.user.name = this.route.snapshot.params.name;
  }

}
