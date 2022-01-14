import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerForDecliningRegistrationComponent } from './add-answer-for-declining-registration.component';

describe('AddAnswerForDecliningRegistrationComponent', () => {
  let component: AddAnswerForDecliningRegistrationComponent;
  let fixture: ComponentFixture<AddAnswerForDecliningRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnswerForDecliningRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerForDecliningRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
