import { TestBed } from '@angular/core/testing';

import { ShipReservationService } from './ship-reservation-service.service';

describe('ShipReservationService', () => {
  let service: ShipReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
