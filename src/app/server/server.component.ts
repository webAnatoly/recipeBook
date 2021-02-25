import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  @Input()serverId = 10;
  @Input()serverName = 'NoName';
  private serverStatus = 'offline';
  curlyBraces = `{{}}`;

  constructor() { }

  ngOnInit(): void {
  }

  getServerStatus(): string {
    return this.serverStatus;
  }

  get publicServerStatus(): string {
    return this.serverStatus;
  }

}
