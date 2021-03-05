import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

/*
CanComponentDeactivate - our own interface and this one forces us to implement the canDeactivate method
in this component
 */

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string} = {id: 0, name: '', status: ''};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

/*  private route: ActivatedRoute - инжектируем роутеровский сервис ActivatedRoute, чтобы с его помощью получать
  ?query параметры и #fragment из url*/

  ngOnInit(): void {
    this.server = this.serversService.getServer(+this.route.snapshot.params.id);
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
      this.allowEdit = queryParam.allowEdit === '1';
    });
    this.route.fragment.subscribe((fragment) => {
      console.log('fragment', fragment);
    });
  }

  onUpdateServer(): void {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    }).catch(error => console.error(error));
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // here in canDeactivate, we now provide the actual logic deciding on whether we are allowed to leave or not.
    // This logic will be run whenever the CanDeactivateGuard is checked by the Angular router.

    // Если нет прав на редактирование, то можно безболезненно покидать компонент
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved ) {
      const message = `Do you want to discard the changes?`;
      return confirm(message);
    } else {
      return true;
    }

  }

}
