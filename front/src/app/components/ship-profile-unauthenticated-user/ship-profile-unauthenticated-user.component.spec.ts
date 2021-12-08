import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipProfileUnauthenticatedUserComponent } from './ship-profile-unauthenticated-user.component';

describe('ShipProfileUnauthenticatedUserComponent', () => {
  let component: ShipProfileUnauthenticatedUserComponent;
  let fixture: ComponentFixture<ShipProfileUnauthenticatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipProfileUnauthenticatedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipProfileUnauthenticatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
