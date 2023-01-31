import { PostsComponent } from './../pages/posts/posts.component';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, combineLatest, map, pipe, Subject, throwError, shareReplay, BehaviorSubject, merge, scan, concatMap, of } from 'rxjs';
import { CRUDAction, IPost } from '../interfaces/ipost';
import { DeclarativeCategoryService } from './declarative-category.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarativePostService {

  constructor(private http:HttpClient,private categoryService:DeclarativeCategoryService) { }


  handleError(error:Error){
  return throwError(() => {return "unknown error occured. Please try again"});
  }


  posts$ = this.http.get<{[id:string]:IPost}>("https://angular-rxjspost-default-rtdb.firebaseio.com/posts.json")
  .pipe(
    map(posts =>{
      let postsData:IPost[] = [];
      for(let id in posts){
      postsData.push({...posts[id],id})
      }
      return postsData
    }),
    catchError(this.handleError),shareReplay(1)
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
}),catchError(this.handleError),shareReplay(1)
);


private postCRUDSubject = new Subject<CRUDAction<IPost>>();
postCRUDAction$ = this.postCRUDSubject.asObservable();

allPost$ = merge(this.postsWithCategories$,this.postCRUDAction$.pipe(
  concatMap((postAction) => this.savePost(postAction).pipe(
    map(post => ({...postAction,data:post}))
  )
  )
)
).pipe(
  scan((posts,value) =>{
    return this.modifyPosts(posts,value)
  }, [] as IPost[])
)

modifyPosts(posts:IPost[],value:IPost[] | CRUDAction<IPost>){
if(!(value instanceof Array)){
  if(value.action == 'add'){
    return [...posts,value.data];
  }
}else{
  return value;
}
return posts;
}

addPost(post:IPost){
  this.postCRUDSubject.next({action:'add',data:post});
}

savePost(postAction:CRUDAction<IPost>){
  if(postAction.action == 'add'){
  return this.addPostToServer(postAction.data);
  }

  return of(postAction.data);
}

addPostToServer(post:IPost){
  return this.http.post<{name:string}>("https://angular-rxjspost-default-rtdb.firebaseio.com/posts.json",post)
  .pipe(map(id =>{
    return {
      ...post,
      id: id.name
    }
  }))
}

private selectedPostSubject = new BehaviorSubject<string>('0');
selectedPostSubjectAction$ = this.selectedPostSubject.asObservable();

post$ = combineLatest([this.postsWithCategories$,this.selectedPostSubjectAction$]).pipe(map(([posts,selectedPostId])=>{
  return posts.find((post:any) => post.id == selectedPostId);
}),catchError(this.handleError),shareReplay(1)
);

selectPost(postId:string){
  this.selectedPostSubject.next(postId);
}



}
