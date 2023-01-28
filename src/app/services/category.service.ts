import { ICategory } from './../interfaces/icategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}

  getCategories(){
    return this.http.get<{[id:string]:ICategory}>("https://angular-rxjspost-default-rtdb.firebaseio.com/category.json")
    .pipe(
      map(categories =>{
        let categoriesData:ICategory[] = [];
        for(let id in categories){
          categoriesData.push({...categories[id],id})
        }
        return categoriesData
      })
    );
  }


}
