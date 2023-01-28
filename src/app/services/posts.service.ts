import { CategoryService } from './category.service';
import { IPost } from './../interfaces/ipost';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, mergeMap, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient,private categoryService:CategoryService) {}

  getPosts(){
    return this.http.get<{[id:string]:IPost}>("https://angular-rxjspost-default-rtdb.firebaseio.com/posts.json")
    .pipe(
      map(posts =>{
        let postsData:IPost[] = [];
        for(let id in posts){
        postsData.push({...posts[id],id})
        }
        return postsData
      })
    );
  }

  getPostWithCategories(){
    return this.getPosts().pipe(mergeMap(posts =>{
      return this.categoryService.getCategories().pipe(map(categories =>{
        return posts.map(post =>{
          return {
            ...post,
            categoryName:categories.find((category:any) => category.id == post.categoryId)?.title
          }
        })
      }))
    }))
  }

}
