import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCreatePost(postData: { title: string; content: string }): void {
    const endpoint = 'https://ng-project-881e4-default-rtdb.firebaseio.com/';
    /*
    API может быть разным. У каждого API свой API :)
    Читаем документацию или спрашиваем у бекенд разработчика куда и в каком виде слать запросы.
    В этом мини-приложении используем в качестве бекенда Firebase.
    */

    this.http.post(
      `${endpoint}posts.json`,
      postData
    ).subscribe((responseData) => {
      console.log('responseData', responseData);
    });
  }

  onFetchPosts(): void {
    // Send Http request
  }

  onClearPosts(): void {
    // Send Http request
  }
}
