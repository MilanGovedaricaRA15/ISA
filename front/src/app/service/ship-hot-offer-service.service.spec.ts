import { TestBed } from '@angular/core/testing';

import { ShipHotOfferService } from './ship-hot-offer-service.service';

describe('ShipHotOfferService', () => {
  let service: ShipHotOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipHotOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
