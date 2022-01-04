import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipCalendarComponent } from './ship-calendar.component';

describe('ShipCalendarComponent', () => {
  let component: ShipCalendarComponent;
  let fixture: ComponentFixture<ShipCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
