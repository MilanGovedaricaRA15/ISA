import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileUnauthenticatedUserComponent } from './instructor-profile-unauthenticated-user.component';

describe('InstructorProfileUnauthenticatedUserComponent', () => {
  let component: InstructorProfileUnauthenticatedUserComponent;
  let fixture: ComponentFixture<InstructorProfileUnauthenticatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorProfileUnauthenticatedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorProfileUnauthenticatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
