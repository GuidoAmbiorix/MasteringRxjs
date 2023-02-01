import { animate, state, style, transition, trigger } from '@angular/animations';
import { DeclarativeRegistroPreService } from './../../services/declarative-registro-pre.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-pre-index',
  templateUrl: './registro-pre-index.component.html',
  styleUrls: ['./registro-pre-index.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RegistroPreIndexComponent implements OnInit{



  constructor(private registroPreService:DeclarativeRegistroPreService){}

  procedencia$ = this.registroPreService.procedencia$;
  cargo$ = this.registroPreService.cargos$;

  ngOnInit(): void {


  }

  displayedColumns: string[] = ['acciones','provincia', 'municipio', 'circunscripcion', 'distritoMunicipal'];
  dataSource:any = this.procedencia$;


  displayedColumnsDetails: string[] = ['cargo','cedula','nombre','apellido','sexo','acciones'];
  dataSourceDetails:any = this.cargo$;

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

}
