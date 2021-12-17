import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOwnerProfileComponent } from './ship-owner-profile.component';

describe('ShipOwnerProfileComponent', () => {
  let component: ShipOwnerProfileComponent;
  let fixture: ComponentFixture<ShipOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOwnerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
