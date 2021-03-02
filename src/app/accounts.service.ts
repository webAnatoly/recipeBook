import { LoggingService } from './logging.service';

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
  }

  updateStatus(id: number, status: string): void {
    this.accounts[id].status = status;
  }
}
