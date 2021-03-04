import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string} = {id: 0, name: '', status: ''};
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.server = this.serversService.getServer(+params.id);
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.allowEdit = Boolean(Number(queryParams.allowEdit));
    });
  }

  onEdit(): void {
    if (this.allowEdit) {
      this.router.navigate(['edit'], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      }).catch(error => console.error(error));
      /* Навигация относительно текущего роутера, а текущий роутер здесь '/servers/:id'
      соответсвенно путь будет '/servers/:id/edit'

      queryParamsHandling: 'preserve' - я так понимаю 'preserve' означает сохранить текущий ?query параметр и прилепить
      его к пути.

      Еще есть 'merge' он мержит старые параметры, с новыми. Например если мы хотим сохранить старые параметры и еще к ним
      добавить новые, то надо использовать 'merge'

      * */
    }
  }
}
