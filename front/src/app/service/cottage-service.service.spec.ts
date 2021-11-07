import { TestBed } from '@angular/core/testing';

import { CottageService } from './cottage-service.service';

describe('CottageServiceService', () => {
  let service: CottageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CottageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
