import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCargosComponent } from './asignar-cargos.component';

describe('AsignarCargosComponent', () => {
  let component: AsignarCargosComponent;
  let fixture: ComponentFixture<AsignarCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCargosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
