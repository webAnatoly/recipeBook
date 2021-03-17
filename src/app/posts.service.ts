import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './app.post.model';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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
      postData
    );
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{[key: string]: Post}>(`${this.endpoint}posts.json`)
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
        }
      )
    );
  }

  // удаляет все посты
  clearPosts(): Observable<object> {
    return this.http.delete(
      `${this.endpoint}posts.json`,
    );
  }
}
