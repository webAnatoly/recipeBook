import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string} = {id: 0, name: '', status: ''};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.server = this.serversService.getServer(+params.id);
    });
  }

}
