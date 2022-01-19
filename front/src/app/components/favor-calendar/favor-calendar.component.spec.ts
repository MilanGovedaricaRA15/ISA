import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorCalendarComponent } from './favor-calendar.component';

describe('FavorCalendarComponent', () => {
  let component: FavorCalendarComponent;
  let fixture: ComponentFixture<FavorCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
