import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageOwnerReportComponent } from './cottage-owner-report.component';

describe('CottageOwnerReportComponent', () => {
  let component: CottageOwnerReportComponent;
  let fixture: ComponentFixture<CottageOwnerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageOwnerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageOwnerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
