import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFavorComponent } from './add-new-favor.component';

describe('AddNewFavorComponent', () => {
  let component: AddNewFavorComponent;
  let fixture: ComponentFixture<AddNewFavorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewFavorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
