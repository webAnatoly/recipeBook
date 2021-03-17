import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Post } from './app.post.model';
import { map, catchError } from 'rxjs/operators';
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
          params: searchParams
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
    );
  }
}
