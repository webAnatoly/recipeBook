import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string} = {id: 0, name: '', status: ''};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

/*  private route: ActivatedRoute - инжектируем роутеровский сервис ActivatedRoute, чтобы с его помощью получать
  ?query параметры и #fragment из url*/

  ngOnInit(): void {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    /* Первый способ получения параметров это получение их из snapshot
    * Помним, что snapshot создается только один раз при создании компонента и при обновлении компонента
    * snapshot больше не обновляется */
    console.log('route.snapshot.queryParams', this.route.snapshot.queryParams);
    console.log('route.snapshot.fragment', this.route.snapshot.fragment);

    /* Второй способ это подписаться на Observable, который возвращается из this.route.queryParams
    * В этом случае при update компонента обсервер будет эмитить значения, и если они изменились мы получим новые значения */
    this.route.queryParams.subscribe((queryParam) => {
      console.log('queryParam', queryParam);
    });
    this.route.fragment.subscribe((fragment) => {
      console.log('fragment', fragment);
    });
  }

  onUpdateServer(): void {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
