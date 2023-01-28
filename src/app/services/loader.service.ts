import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<boolean>();
  loaderAction$ = this.loaderSubject.asObservable();


  showLoader(){
  this.loaderSubject.next(true);
  }


  hideLoader(){
    this.loaderSubject.next(false);
  }

  constructor() { }
}
