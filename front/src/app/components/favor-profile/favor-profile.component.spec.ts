import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorProfileComponent } from './favor-profile.component';

describe('FavorProfileComponent', () => {
  let component: FavorProfileComponent;
  let fixture: ComponentFixture<FavorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
