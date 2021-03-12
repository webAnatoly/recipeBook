import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 3000);
  });
  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];
  filteredStatus = '';
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date},
                   classPrefix: 'list-group-item' | 'badge'):
    {[key: string]: boolean} {
    switch (classPrefix) {
      case 'list-group-item':
        return {
          'list-group-item-success': server.status === 'stable',
          'list-group-item-warning': server.status === 'offline',
          'list-group-item-danger': server.status === 'critical'
        };
      case 'badge':
        return {
          'badge-success': server.status === 'stable',
          'badge-secondary': server.status === 'offline',
          'badge-danger': server.status === 'critical'
        };
    }
  }

  onAddServer(): void {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    });
  }
}
