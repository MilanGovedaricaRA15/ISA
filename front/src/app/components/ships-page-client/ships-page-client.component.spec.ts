import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsPageClientComponent } from './ships-page-client.component';

describe('ShipsPageClientComponent', () => {
  let component: ShipsPageClientComponent;
  let fixture: ComponentFixture<ShipsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
