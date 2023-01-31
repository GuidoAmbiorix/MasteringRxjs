import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPreIndexComponent } from './registro-pre-index.component';

describe('RegistroPreIndexComponent', () => {
  let component: RegistroPreIndexComponent;
  let fixture: ComponentFixture<RegistroPreIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPreIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPreIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
