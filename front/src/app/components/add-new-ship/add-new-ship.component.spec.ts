import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewShipComponent } from './add-new-ship.component';

describe('AddNewShipComponent', () => {
  let component: AddNewShipComponent;
  let fixture: ComponentFixture<AddNewShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
