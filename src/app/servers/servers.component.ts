import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

/*
private route: ActivatedRoute - simply injects the currently active routes,
so for the component you loaded, this will be the route which loaded this component
and the route simply is kind of a complex Javascript object which keeps a lot of meta information
about the currently active route.
 */

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }

  onReloadPage(): void {
    // Пример навигации по относитльному пути
    this.router.navigate(['servers'], {relativeTo: this.route}).catch(error => console.log(error));
    /*relativeTo - here we define relative to which route this link should be loaded
    and by default, this is always the root domain "/" */

    /*

    Сейчас должен выдать ошибки: Cannot match any routes. URL Segment: 'servers/servers'

    */

  }
}
