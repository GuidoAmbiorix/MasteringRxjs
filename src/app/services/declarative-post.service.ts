import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, combineLatest, map, pipe, Subject, throwError, shareReplay } from 'rxjs';
import { IPost } from '../interfaces/ipost';
import { DeclarativeCategoryService } from './declarative-category.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarativePostService {

  posts$ = this.http.get<{[id:string]:IPost}>("https://angular-rxjspost-default-rtdb.firebaseio.com/posts.json")
  .pipe(
    map(posts =>{
      let postsData:IPost[] = [];
      for(let id in posts){
      postsData.push({...posts[id],id})
      }
      return postsData
    }),
    catchError(this.handleError)
  );

 postsWithCategories$ = combineLatest([this.posts$,this.categoryService.categories$])
.pipe(map(([posts,categories]) =>{
  return posts.map(post =>{
    return{
      ...post,
      categoryName: categories.find((category:any) => category.id == post.categoryId)?.title
    } as IPost
  })
  // catchError(this.handleError)
}),catchError(this.handleError)
);


private selectedPostSubject = new Subject<string>();
selectedPostSubjectAction$ = this.selectedPostSubject.asObservable();

post$ = combineLatest([this.postsWithCategories$,this.selectedPostSubjectAction$]).pipe(map(([posts,selectedPostId])=>{
  return posts.find((post:any) => post.id == selectedPostId);
}),catchError(this.handleError),shareReplay(1)
);

selectPost(postId:string){
  this.selectedPostSubject.next(postId);
}

  constructor(private  http:HttpClient,private categoryService:DeclarativeCategoryService) { }


  handleError(error:Error){
  return throwError(() => {return "unknown error occured. Please try again"});
  }

}
