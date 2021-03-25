import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

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

  constructor(private http: HttpClient) { }
  private apiKey = 'AIzaSyD3KaD_soSYsNf8-U_1On-7CLEoLuRzxJM';
  user = new Subject<User>(); // we emit a new user whenever we have one we login or also when we logout,
  // when we clear the user, when the user becomes invalid or the token expired.

  static handleError(errorResponse: HttpErrorResponse): Observable<never> {
    console.log('errorResponse:', errorResponse);
    let errorMessage = 'An error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesn\'t exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Not correct login or password!';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(Date.now() + expiresIn * 1000);
    const user: User = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    return this.http.post<AuthResponseData>(endpoint, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      catchError(AuthService.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          Number(responseData.expiresIn)
        );
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    return this.http.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      catchError(AuthService.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          Number(responseData.expiresIn)
        );
      })
    );
  }
}
