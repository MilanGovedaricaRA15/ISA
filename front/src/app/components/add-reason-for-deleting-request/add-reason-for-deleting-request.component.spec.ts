import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReasonForDeletingRequestComponent } from './add-reason-for-deleting-request.component';

describe('AddReasonForDeletingRequestComponent', () => {
  let component: AddReasonForDeletingRequestComponent;
  let fixture: ComponentFixture<AddReasonForDeletingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReasonForDeletingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReasonForDeletingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
