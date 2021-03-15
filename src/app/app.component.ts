import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './app.post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  endpoint = 'https://ng-project-881e4-default-rtdb.firebaseio.com/';
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(postData: Post): void {
    /*
    API может быть разным. У каждого API свой API :)
    Читаем документацию или спрашиваем у бекенд разработчика куда и в каком виде слать запросы.
    В этом мини-приложении используем в качестве бекенда Firebase.
    */

    this.http.post<{name: string}>( // потому что firebase api возвращает объект со свойством {name: 'EntryIdAsString'}
      `${this.endpoint}posts.json`,
      postData
    ).subscribe((responseData) => {
      console.log('responseData', responseData.name);
    });
  }

  onFetchPosts(): void {
    this.fetchPosts();
  }

  onClearPosts(): void {
    // Send Http request
  }

  private fetchPosts(): void {
    this.isFetching = true;
    this.http
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
        })
      )
      .subscribe((posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, (error) => {
        this.isFetching = false;
      }
    );
  }
}
