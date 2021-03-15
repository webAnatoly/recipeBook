import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './app.post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        console.error(error);
      }
    );
  }

  onCreatePost(postData: Post): void {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts(): void {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
        console.log('test');
      },
      (error) => {
        this.isFetching = false;
        console.error(error);
      }
    );
  }

  onClearPosts(): void {
    // Send Http request
  }

}
