import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCottageComponent } from './add-new-cottage.component';

describe('AddNewCottageComponent', () => {
  let component: AddNewCottageComponent;
  let fixture: ComponentFixture<AddNewCottageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCottageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCottageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
