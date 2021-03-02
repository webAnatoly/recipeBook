import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';

/* if you inject a service into something, this something needs to have some metadata attached to it.
   Такие метаданные даем ангуляру с помощью директивы @Injectable

  @Injectable tells Angular that now this service is injectable or that something can be injected in there to be precise.
  You don't add @Injectable to the service you want to inject but to the service where you want to inject something.

*/
@Injectable()
export class AccountsService {
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

  constructor(private loggingService: LoggingService) { }

  addAccount(name: string, status: string): void {
    this.accounts.push({name, status});
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string): void {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
