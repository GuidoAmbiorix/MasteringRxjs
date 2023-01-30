import { IPost } from 'src/app/interfaces/ipost';
import { DeclarativePostService } from './../../services/declarative-post.service';
import { DeclarativeCategoryService } from './../../services/declarative-category.service';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddPostComponent  implements OnInit{

  constructor(
    private categories:DeclarativeCategoryService,
    private postService:DeclarativePostService

    ){}

  categories$ = this.categories.categories$;

  postForm = new FormGroup({
    title:new FormControl(''),
    description:new FormControl(''),
    categoryId:new FormControl('')
  })


  onAddPost(){
  this.postService.addPost(this.postForm.value as IPost);
  }

  ngOnInit(): void {
  }
}
