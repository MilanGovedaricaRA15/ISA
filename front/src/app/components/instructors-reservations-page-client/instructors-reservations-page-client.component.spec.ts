import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsReservationsPageClientComponent } from './instructors-reservations-page-client.component';

describe('InstructorsReservationsPageClientComponent', () => {
  let component: InstructorsReservationsPageClientComponent;
  let fixture: ComponentFixture<InstructorsReservationsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorsReservationsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsReservationsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
