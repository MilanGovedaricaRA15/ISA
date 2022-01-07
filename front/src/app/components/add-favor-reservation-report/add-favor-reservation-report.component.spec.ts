import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavorReservationReportComponent } from './add-favor-reservation-report.component';

describe('AddFavorReservationReportComponent', () => {
  let component: AddFavorReservationReportComponent;
  let fixture: ComponentFixture<AddFavorReservationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavorReservationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavorReservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
