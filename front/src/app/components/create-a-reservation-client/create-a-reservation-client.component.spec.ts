import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAReservationClientComponent } from './create-a-reservation-client.component';

describe('CreateAReservationClientComponent', () => {
  let component: CreateAReservationClientComponent;
  let fixture: ComponentFixture<CreateAReservationClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAReservationClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAReservationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
