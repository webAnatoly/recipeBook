import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit, OnDestroy {
  allowNewServer = false;
  timeoutId = 0;
  serverCreationStatus = 'No server was created!';
  serverName = 'TestServer';
  servers = ['TestServer', 'TestServer_2'];

  constructor() {

  }

  onClickAddServer(): void {
    this.createServer();
  }

  private createServer(): void {
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Sever was created! Name is ${this.serverName}`;
  }

  onUpdateServerName(event: Event): void {
    this.serverName = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    console.log('component destroyed');
  }

}
