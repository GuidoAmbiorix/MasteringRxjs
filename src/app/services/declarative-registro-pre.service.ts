import { Procedencia } from './../interfaces/procedencia';
import { Persona } from './../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../interfaces/cargo';
import { map, merge, scan, shareReplay, mergeMap, interval, combineLatest, concatAll, Subject, catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarativeRegistroPreService {

  constructor(private http:HttpClient) { }

  cargos$ = this.http.get<{[id:string]:Cargo}>("https://angular-rxjspost-default-rtdb.firebaseio.com/cargo.json").pipe(
    shareReplay(1)
  );

  personas$ = this.http.get<{[id:string]:Persona}>("https://angular-rxjspost-default-rtdb.firebaseio.com/persona.json")
  .pipe(
    map(personas =>{
      let personaData:Persona[] = [];
      for(let id in personas){
        personaData.push({...personas[id],id})
      }
      return personaData
    })
  );

  procedencia$ = this.http.get<{[id:string]:Procedencia}>("https://angular-rxjspost-default-rtdb.firebaseio.com/procedencia.json").pipe(
    shareReplay(1)
  );


 private GetCedulaSubject = new Subject<string>()
 getCedulaAction$ = this.GetCedulaSubject.asObservable();

 GetCedula(cedula:any){
this.GetCedulaSubject.next(cedula);

 }

 personasCedula$ = combineLatest([this.personas$,this.getCedulaAction$]).pipe(map(([personas,cedulas])=>{
  return personas.find(persona => persona.cedula == cedulas)
})
);


}
