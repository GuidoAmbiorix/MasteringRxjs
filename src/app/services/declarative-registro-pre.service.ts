import { Procedencia } from './../interfaces/procedencia';
import { Persona } from './../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../interfaces/cargo';
import { map, merge, scan, shareReplay, mergeMap, interval, combineLatest, concatAll } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarativeRegistroPreService {

  constructor(private http:HttpClient) { }

  cargos$ = this.http.get<{[id:string]:Cargo}>("https://angular-rxjspost-default-rtdb.firebaseio.com/cargo.json").pipe(
    shareReplay()
  );

  personas$ = this.http.get<{[id:string]:Persona}>("https://angular-rxjspost-default-rtdb.firebaseio.com/persona.json").pipe(
    shareReplay()
  );

  procedencia$ = this.http.get<{[id:string]:Procedencia}>("https://angular-rxjspost-default-rtdb.firebaseio.com/procedencia.json").pipe(
    shareReplay()
  );



}
