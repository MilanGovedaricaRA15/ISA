import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipHotOfferComponent } from './ship-hot-offer.component';

describe('ShipHotOfferComponent', () => {
  let component: ShipHotOfferComponent;
  let fixture: ComponentFixture<ShipHotOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipHotOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipHotOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
