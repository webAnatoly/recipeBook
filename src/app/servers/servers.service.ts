export class ServersService {
  private servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

  getServers(): {id: number, name: string, status: string}[] {
    return this.servers;
  }

  getServer(id: number): {id: number, name: string, status: string} {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    const defaultServer = {id: 0, name: 'сервер по умолчанию', status: 'сервер не найден'};
    return server ? server : defaultServer;
  }

  updateServer(id: number, serverInfo: {name: string, status: string}): void {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
