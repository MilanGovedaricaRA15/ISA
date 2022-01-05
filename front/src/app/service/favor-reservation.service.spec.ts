import { TestBed } from '@angular/core/testing';

import { FavorReservationService } from './favor-reservation.service';

describe('FavorReservationService', () => {
  let service: FavorReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
