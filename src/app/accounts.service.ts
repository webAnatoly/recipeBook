import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';

/* if you inject a service into something, this something needs to have some metadata attached to it.
   Такие метаданные даем ангуляру с помощью директивы @Injectable

  @Injectable tells Angular that now this service is injectable or that something can be injected in there to be precise.
  You don't add @Injectable to the service you want to inject but to the service where you want to inject something.

  if you don't want to inject anything in a service you don't need to add @Injectable.
  Only add it if you expect to get something injected.

  @Injectable - помечает данный класс, как класс который будет подвергаться инжектирования, т.е. в этот класс
  будет инжектироваться зависимость, например другой сервис.

  Вот строка из документации: @Injectable - Decorator that marks a class as available to be provided and injected as a dependency.

  Если я правильно понял из курса, то ангуляр рекомендует всем сервисам добавлять декоратор @Injectable даже если
  не планируется в данный сервис что-то инжектить. Ну на всякий случай, вдруг в будущем запланируется.
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
