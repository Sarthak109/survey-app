import { TestBed } from '@angular/core/testing';

import { NepService } from './nep.service';

describe('NepService', () => {
  let service: NepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
