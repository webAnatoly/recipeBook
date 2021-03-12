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
    // Send Http request
    console.log(postData);
  }

  onFetchPosts(): void {
    // Send Http request
  }

  onClearPosts(): void {
    // Send Http request
  }
}
