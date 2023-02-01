import { DeclarativeRegistroPreService } from './../../services/declarative-registro-pre.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-asignar-cargos',
  templateUrl: './asignar-cargos.component.html',
  styleUrls: ['./asignar-cargos.component.scss']
})
export class AsignarCargosComponent implements OnInit {

  constructor(private declarativePreRegistroService:DeclarativeRegistroPreService){}

  asignarForm = new FormGroup({
    cedula:new FormControl('',{validators:Validators.required}),
    nombre:new FormControl({value:'',disabled:true}),
    apellido:new FormControl({value:'',disabled:true}),
    sexo:new FormControl({value:'',disabled:true}),
  });


  ngOnInit(): void {
  this.declarativePreRegistroService.personasCedula$.subscribe(persona => {
    this.asignarForm.patchValue({
      nombre:persona?.nombre,
      apellido:persona?.apellido,
      sexo:persona?.sexo
    });
  });
  }

  GetDataFromCedula(event:any){
  if(event.keyCode === 13 && this.asignarForm.valid){
    this.declarativePreRegistroService.GetCedula(this.asignarForm.controls['cedula'].value);
  }
  }


  AsignarCargo(){

  }

  cedulaMask = createMask('[99999999999]')
}
