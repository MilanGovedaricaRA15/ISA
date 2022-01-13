import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerToComplaintComponent } from './add-answer-to-complaint.component';

describe('AddAnswerToComplaintComponent', () => {
  let component: AddAnswerToComplaintComponent;
  let fixture: ComponentFixture<AddAnswerToComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnswerToComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerToComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
