import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOwnerReservationsComponent } from './ship-owner-reservations.component';

describe('ShipOwnerReservationsComponent', () => {
  let component: ShipOwnerReservationsComponent;
  let fixture: ComponentFixture<ShipOwnerReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOwnerReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOwnerReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
