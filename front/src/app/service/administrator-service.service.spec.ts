import { TestBed } from '@angular/core/testing';

import { AdministratorService } from './administrator-service.service';

describe('AdministratorServiceService', () => {
  let service: AdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
