import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string} = {id: 0, name: '', status: ''};

  constructor(private serversService: ServersService) { }

  ngOnInit(): void {
    this.server = this.serversService.getServer(1);
  }

}
