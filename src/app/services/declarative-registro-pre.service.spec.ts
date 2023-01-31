import { TestBed } from '@angular/core/testing';

import { DeclarativeRegistroPreService } from './declarative-registro-pre.service';

describe('DeclarativeRegistroPreService', () => {
  let service: DeclarativeRegistroPreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarativeRegistroPreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
