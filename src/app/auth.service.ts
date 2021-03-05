import { Injectable } from '@angular/core';

/* Сервис имитирующий авторизацию */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }

  // эмулириет асинхронную проверку авторизации. Например запрос на сервер
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.loggedIn);
        } catch (error) {
          reject(error);
        }
      }, 800);
    });
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
