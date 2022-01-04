import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipProfileClientComponent } from './ship-profile-client.component';

describe('ShipProfileClientComponent', () => {
  let component: ShipProfileClientComponent;
  let fixture: ComponentFixture<ShipProfileClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipProfileClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
