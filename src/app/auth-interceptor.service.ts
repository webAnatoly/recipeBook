import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  // This intercept method now allows us to run code, that will run right before the request leaves our application.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      headers: req.headers.set('My-Header-Added-In-Interceptor', 'My header added in HttpInterceptor')
        .set('My-Header-Added-In-Interceptor-2', encodeURI('Еще один заголовок добавленый через HttpInterceptor')),
      params: req.params.set('my_param', 'param added in HttpInterceptor stage')
        .set('another_param', 'yet another param')
    });

    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived, body data: ', event.body);
        }
      })
    );

    // return next.handle(req); // by calling this you let the request continue

  }
}
