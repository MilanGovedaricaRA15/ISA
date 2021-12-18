import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOwnerReportComponent } from './ship-owner-report.component';

describe('ShipOwnerReportComponent', () => {
  let component: ShipOwnerReportComponent;
  let fixture: ComponentFixture<ShipOwnerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOwnerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOwnerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
