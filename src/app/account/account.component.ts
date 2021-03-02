import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [LoggingService], // informs Angular how to create this loggingService
})
export class AccountComponent {
  @Input() account: {name: string, status: string} = {name: 'default name', status: 'default status'};
  @Input() id = 0;

  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}

  onSetTo(status: string): void {
    this.accountsService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
