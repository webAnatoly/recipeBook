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

  onClickAddServer(): void {
    this.allowNewServer = !this.allowNewServer;
  }

  constructor() {

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
