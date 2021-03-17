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
  error: null | string = null;

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

private fetchPosts(): void {
  this.isFetching = true;
  this.postsService.fetchPosts().subscribe(
    (posts: Post[]) => {
      this.loadedPosts = posts;
      this.isFetching = false;
    },
    (error) => {
      this.isFetching = false;
      console.error(error);
      if (error.error && error.error.error) {
        this.error = error.error.error;
      } else if (error.message) {
        this.error = error.message;
      } else {
        this.error = 'unexpected error';
      }
    }
  );
}

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(postData: Post): void {
    this.postsService.createAndStorePost(postData.title, postData.content).subscribe(
      (post: {name: string}) => { // {name: string} - это firebase такое возвращает, где name это айди нового поста
        this.loadedPosts.push({title: postData.title, content: postData.content, id: post.name });
      }
    );
  }

  onFetchPosts(): void {
    this.fetchPosts();
  }

  onClearPosts(): void {
    this.postsService.clearPosts().subscribe(
      () => {
        this.loadedPosts = [];
      });
  }

}
