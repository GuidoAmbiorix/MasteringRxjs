import { IPost } from './../../interfaces/ipost';
import { LoaderService } from './../../services/loader.service';
import { DeclarativeCategoryService } from './../../services/declarative-category.service';
import { DeclarativePostService } from './../../services/declarative-post.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, combineLatest, BehaviorSubject, tap, delay, Subject, pipe, mergeMap, merge, scan } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent implements OnInit {
  selectedFilterChangeSubject = new BehaviorSubject<string>('');
  selectedFilterChangeAction$ = this.selectedFilterChangeSubject.asObservable();

  selectedDescriptionIdSubject = new BehaviorSubject<string>('');
  selectedDescriptionIdAction$ = this.selectedDescriptionIdSubject.asObservable();

  selectedIdRowSubject = new Subject<number>();
  selectedIdRowAction$ = this.selectedIdRowSubject.asObservable();

  posts$ = this.postServie.postsWithCategories$;
  categories$ = this.categoryService.categories$;


filteredPosts$ = combineLatest([this.posts$,this.selectedFilterChangeAction$,this.selectedDescriptionIdAction$])
.pipe(
  map(([posts,categorySelectedId,descriptionId]) =>{
  return posts.filter(post =>
    categorySelectedId ? post.categoryId == categorySelectedId:true &&
    descriptionId ? post.id == descriptionId:true
    )
}),
tap(data =>{
  this.loaderService.hideLoader();
})
);

  onCategoryChange(event:string){
  let selectedCategoryId = event
  this.selectedFilterChangeSubject.next(selectedCategoryId);
  }

  onDescriptionChange(event:string){
  let selectedDescription = event;
  console.log(event);
  this.selectedDescriptionIdSubject.next(selectedDescription);
  }

  constructor(
    private postServie:DeclarativePostService,
    private categoryService:DeclarativeCategoryService,
    private loaderService:LoaderService
    ){}

  ngOnInit(): void {
    this.loaderService.showLoader();
  }

  GetRowId(idRow:any){
  this.selectedIdRowSubject.next(idRow.id);
  }

  displayedColumns: string[] = ['actions','title', 'categoryName', 'description',];
  displayedColumnsDetails: string[] = ['title', 'categoryName', 'description',];
  dataSource:any = this.filteredPosts$;
  expandedElement:IPost[] = [];

  panelOpenState = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }


}

