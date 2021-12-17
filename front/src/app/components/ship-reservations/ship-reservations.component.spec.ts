import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipReservationsComponent } from './ship-reservations.component';

describe('ShipReservationsComponent', () => {
  let component: ShipReservationsComponent;
  let fixture: ComponentFixture<ShipReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
