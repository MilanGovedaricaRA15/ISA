import { TestBed } from '@angular/core/testing';

import { HotOfferService } from './hot-offer-service.service';

describe('HotOfferService', () => {
  let service: HotOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
