import { TestBed } from '@angular/core/testing';

import { FavorHotOfferService } from './favor-hot-offer.service';

describe('FavorHotOfferService', () => {
  let service: FavorHotOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorHotOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
