import { TestBed } from '@angular/core/testing';

import { HotOfferServiceService } from './hot-offer-service.service';

describe('HotOfferServiceService', () => {
  let service: HotOfferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotOfferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
