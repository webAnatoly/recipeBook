import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;      // A Firebase Auth ID token for the newly created user.
  email: string;        // The email for the newly created user.
  refreshToken: string; // A Firebase Auth refresh token for the newly created user.
  expiresIn: string;    // The number of seconds in which the ID token expires.
  localId: string;      // The uid of the newly created user.
  registered?: boolean; // Whether the email is for an existing account.
  kind?: string;        // В документации не указан, но firebase возвращает, возможно это устаревший параметр
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyD3KaD_soSYsNf8-U_1On-7CLEoLuRzxJM';

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    return this.http.post<AuthResponseData>(endpoint, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      catchError(errorResponse => {
        let errorMessage = 'An error occurred!';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }
        if (errorResponse.error.error.message === 'EMAIL_EXISTS') {
          errorMessage = 'This email exists already!';
        }
        return throwError(errorMessage);
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    return this.http.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }
}
