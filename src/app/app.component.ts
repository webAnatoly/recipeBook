import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // здесь массив, потому-что можно несколько файлов стилей подключать, если надо.
})
export class AppComponent {
  name = 'Tolik';
  onlyOdds = false;
  evens = [2, 4, 6, 8];
  odds = [1, 3, 5];

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  onAccountAdded(newAccount: {name: string, status: string}): void {
    this.accounts.push(newAccount);
  }

  onStatusChanged(updateInfo: {id: number, newStatus: string}): void {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
  }

  onToggleNumber(): void {
    this.onlyOdds = !this.onlyOdds;
  }
}
