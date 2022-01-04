import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileClientComponent } from './instructor-profile-client.component';

describe('InstructorProfileClientComponent', () => {
  let component: InstructorProfileClientComponent;
  let fixture: ComponentFixture<InstructorProfileClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorProfileClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
