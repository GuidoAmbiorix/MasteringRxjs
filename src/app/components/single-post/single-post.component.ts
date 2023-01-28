import { LoaderService } from './../../services/loader.service';
import { catchError, EMPTY, Subject } from 'rxjs';
import { DeclarativePostService } from './../../services/declarative-post.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent implements OnInit{

  constructor(private postService:DeclarativePostService,private loaderService:LoaderService){}

  showLoader$ = this.loaderService.loaderAction$;

  ngOnInit(): void {

  }
    errorMessageSubject = new Subject<string>();
    errorMessageAction$ = this.errorMessageSubject.asObservable();

    posts$ =   this.postService.post$.pipe(
      catchError((error:string) =>{
      this.errorMessageSubject.next(error);
      return EMPTY;
      })
    );

}
