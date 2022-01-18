import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsPageClientComponent } from './reservations-page-client.component';

describe('ReservationsPageClientComponent', () => {
  let component: ReservationsPageClientComponent;
  let fixture: ComponentFixture<ReservationsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
