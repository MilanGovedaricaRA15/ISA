import { TestBed } from '@angular/core/testing';

import { BookingRevenueService } from './booking-revenue.service';

describe('BookingRevenueService', () => {
  let service: BookingRevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingRevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
