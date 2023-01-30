import { AddPostComponent } from './../../components/add-post/add-post.component';
import { delay, tap, combineLatest, map } from 'rxjs';
import { LoaderService } from './../../services/loader.service';
import { IPost } from 'src/app/interfaces/ipost';
import { DeclarativePostService } from './../../services/declarative-post.service';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.scss']
})
export class AltPostsComponent implements OnInit {

  constructor(
    private postService:DeclarativePostService,
    private loaderService:LoaderService,
    private dialog:MatDialog
    ){}

  ngOnInit(): void {}

  posts$ = this.postService.allPost$;

  selectedPost$ = this.postService.post$.pipe(delay(500),tap(data => {this.loaderService.hideLoader()
  }));

  vm$ = combineLatest([this.posts$,this.selectedPost$]).pipe(
  map(([posts,selectedPost])=>{
    return {posts,selectedPost}
  })
  );

  onSelectPost(post:string){
  this.postService.selectPost(post);
  this.loaderService.showLoader();
  }

  onAddPost(){
  this.dialog.open(AddPostComponent,{
    height:'50%',
    width:'30%'
  })
  }

}
