import { TestBed } from '@angular/core/testing';

import { AccountDeleteRequestService } from './account-delete-request-service.service';

describe('AccountDeleteRequestService', () => {
  let service: AccountDeleteRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountDeleteRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
