import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [LoggingService], // informs Angular how to create this loggingService
})
export class AccountComponent {
  @Input() account: {name: string, status: string} = {name: 'default name', status: 'default status'};
  @Input() id = 0;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService) {}

  onSetTo(status: string): void {
    this.statusChanged.emit({id: this.id, newStatus: status});
    this.loggingService.logStatusChange(status);
  }
}
