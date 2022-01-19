import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForInstructorCalendarComponent } from './report-for-instructor-calendar.component';

describe('ReportForInstructorCalendarComponent', () => {
  let component: ReportForInstructorCalendarComponent;
  let fixture: ComponentFixture<ReportForInstructorCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportForInstructorCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportForInstructorCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
