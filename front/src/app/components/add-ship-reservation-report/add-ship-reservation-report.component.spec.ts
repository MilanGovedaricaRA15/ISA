import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipReservationReportComponent } from './add-ship-reservation-report.component';

describe('AddShipReservationReportComponent', () => {
  let component: AddShipReservationReportComponent;
  let fixture: ComponentFixture<AddShipReservationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShipReservationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShipReservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
