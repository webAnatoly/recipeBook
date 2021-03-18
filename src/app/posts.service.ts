import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Post } from './app.post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  endpoint = 'https://ng-project-881e4-default-rtdb.firebaseio.com/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string): Observable<{name: string}> {
    const postData: Post = {title, content};

    return this.http.post<{name: string}>( // потому что firebase api возвращает объект со свойством {name: 'EntryIdAsString'}
      `${this.endpoint}posts.json`,
      postData,
      {
        observe: 'body',
        /*
        body means that you get that response data extracted and converted to a JavaScript object automatically
        but you don't have to stick to body. You can for example else change this to 'response'
        observe: 'response' означает что будет возвращен полный HttpResponse object
        * */
      }
    );
  }

  fetchPosts(): Observable<Post[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty'); // print=pretty это из API firebase
    searchParams = searchParams.append('another', 'my_another_param'); // а это просто для эксперимента

    return this.http
      .get<{[key: string]: Post}>(
        `${this.endpoint}posts.json`,
        {
          headers: new HttpHeaders ({
            'My-Custom-Header': 'Hello',
            'My-Second-Custom-Header': 'Hello 2',
          }),
          params: searchParams,
          responseType: 'json', // по-умолчанию 'json', еще можно 'arraybuffer', 'blob', 'text'
          /*
          responseType: 'arraybuffer' - Constructs a GET request that interprets the body as an ArrayBuffer

          responseType: 'blob'
          Constructs a GET request that interprets the body as a Blob

          responseType: 'text'
          Constructs a GET request that interprets the body as a text string

          responseType: 'json'
          Constructs a GET request that interprets the body as a JSON object
          */
        }
      )
      .pipe(
          map((responseData) => {
              const postArray: Post[] = [];
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  const post: Post = responseData[key];
                  if (post.title && post.content) {
                    postArray.push({ ...post, id: key });
                  }
                }
              }
              return postArray;
            },
          ),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  // удаляет все посты
  clearPosts(): Observable<object> {
    return this.http.delete(
      `${this.endpoint}posts.json`,
      {
        observe: 'events',
      }
    ).pipe(
      tap((event) => { // tap - RxJS operator позволяющий "прикасаться" к Observable без изменения,
        // т.е. можно выполнять какие-то side-effects

        /*
        * HttpEventType содержит, я так понимаю числовые коды состояний выполнения запроса.
        * */

        if (event.type === HttpEventType.Sent) {
          // do something
        }
        if (event.type === HttpEventType.UploadProgress) {
          // do something
        }
        if (event.type === HttpEventType.ResponseHeader) {
          // do something
        }
        if (event.type === HttpEventType.UploadProgress) {
          // do something
        }
        if (event.type === HttpEventType.Response) {
          // do something
        }
        if (event.type === HttpEventType.User) {
          // do something
        }
      })
    );
  }
}
