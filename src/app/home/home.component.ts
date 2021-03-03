import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /* navigation programmatically example */
  onLoadServers(): void {
    /* здесь например могут быть какие-то комплексные вычисления после которых мы хотим перейти на страницу */
    this.router.navigate(['/servers']).catch(error => console.log(error));
  }
}
