// A service is just the normal TypeScript class, and this class can used as a service
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggingService {
  logStatusChange(status: string = 'default value'): void {
    console.log(`A server status changed, new status: ${status}`);
  }
}
