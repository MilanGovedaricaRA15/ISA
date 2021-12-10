import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsReservationsPageClientComponent } from './ships-reservations-page-client.component';

describe('ShipsReservationsPageClientComponent', () => {
  let component: ShipsReservationsPageClientComponent;
  let fixture: ComponentFixture<ShipsReservationsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipsReservationsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsReservationsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
