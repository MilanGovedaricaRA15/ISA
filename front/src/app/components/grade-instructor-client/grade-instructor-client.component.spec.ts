import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeInstructorClientComponent } from './grade-instructor-client.component';

describe('GradeInstructorClientComponent', () => {
  let component: GradeInstructorClientComponent;
  let fixture: ComponentFixture<GradeInstructorClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeInstructorClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeInstructorClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
