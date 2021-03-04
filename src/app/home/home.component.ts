import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /* navigation programmatically example */
  onLoadServer(id: number): void {
    /* здесь например могут быть какие-то комплексные вычисления после которых мы хотим перейти на страницу */
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: {
        allowEdit: '1'
      },
      fragment: 'loading',
    }).catch(error => console.error(error));
  }

  onLogin(): void {
    this.authService.login();
  }
  onLogout(): void {
    this.authService.logout();
  }
}
