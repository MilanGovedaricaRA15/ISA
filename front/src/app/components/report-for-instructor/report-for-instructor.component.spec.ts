import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForInstructorComponent } from './report-for-instructor.component';

describe('ReportForInstructorComponent', () => {
  let component: ReportForInstructorComponent;
  let fixture: ComponentFixture<ReportForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportForInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
