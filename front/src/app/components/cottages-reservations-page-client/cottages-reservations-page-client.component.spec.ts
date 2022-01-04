import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottagesReservationsPageClientComponent } from './cottages-reservations-page-client.component';

describe('CottagesReservationsPageClientComponent', () => {
  let component: CottagesReservationsPageClientComponent;
  let fixture: ComponentFixture<CottagesReservationsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottagesReservationsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottagesReservationsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
