import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // здесь массив, потому-что можно несколько файлов стилей подключать, если надо.
})
export class AppComponent implements OnInit {
  name = 'Tolik';
  onlyOdds = false;
  evens = [2, 4, 6, 8];
  odds = [1, 3, 5];

  accounts: {name: string, status: string}[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }

  onToggleNumber(): void {
    this.onlyOdds = !this.onlyOdds;
  }
}
