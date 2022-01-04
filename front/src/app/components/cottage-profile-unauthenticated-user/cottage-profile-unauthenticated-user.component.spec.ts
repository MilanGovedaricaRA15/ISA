import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageProfileUnauthenticatedUserComponent } from './cottage-profile-unauthenticated-user.component';

describe('CottageProfileUnauthenticatedUserComponent', () => {
  let component: CottageProfileUnauthenticatedUserComponent;
  let fixture: ComponentFixture<CottageProfileUnauthenticatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageProfileUnauthenticatedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageProfileUnauthenticatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
