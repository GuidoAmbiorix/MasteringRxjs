import { delay, tap } from 'rxjs';
import { LoaderService } from './../../services/loader.service';
import { IPost } from 'src/app/interfaces/ipost';
import { DeclarativePostService } from './../../services/declarative-post.service';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.scss']
})
export class AltPostsComponent implements OnInit {

  constructor(private postService:DeclarativePostService,private loaderService:LoaderService){}

  posts$ = this.postService.postsWithCategories$;
  selectedPost$ = this.postService.post$.pipe(delay(1000),tap(data => this.loaderService.hideLoader()));

  onSelectPost(post:string){
  this.postService.selectPost(post);
  this.loaderService.showLoader();
  }

  ngOnInit(): void {}
}
