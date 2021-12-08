import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsPageComponent } from './ships-page.component';

describe('ShipsPageComponent', () => {
  let component: ShipsPageComponent;
  let fixture: ComponentFixture<ShipsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
