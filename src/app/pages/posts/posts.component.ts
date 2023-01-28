import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { IPost } from 'src/app/interfaces/ipost';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit,OnDestroy{
  posts:IPost[] = [];
  postsSubscription!:Subscription;

  displayedColumns: string[] = ['id', 'title', 'categoryName', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private postService:PostsService, private ref:ChangeDetectorRef){}

  ngOnInit(): void {
   this.getposts();
  }

  getposts(){
    this.postsSubscription = this.postService.getPostWithCategories()
    .subscribe({
      next:data =>{
        this.posts = data;
        this.ref.detectChanges();
      },
      error: err => console.log(err),
      complete:() => console.log("Completed!")
    })
  }

  ngOnDestroy(): void {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }
}



