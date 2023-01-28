import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ICategory } from '../interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class DeclarativeCategoryService {

  constructor(private http:HttpClient) {}

    categories$ =  this.http.get<{[id:string]:ICategory}>("https://angular-rxjspost-default-rtdb.firebaseio.com/category.json")
    .pipe(
      map(categories =>{
        let categoriesData:ICategory[] = [];
        for(let id in categories){
          categoriesData.push({...categories[id],id})
        }
        return categoriesData
      }),
      shareReplay(1)
    );

}
