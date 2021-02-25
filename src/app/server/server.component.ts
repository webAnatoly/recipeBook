import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  serverId = 10;
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
