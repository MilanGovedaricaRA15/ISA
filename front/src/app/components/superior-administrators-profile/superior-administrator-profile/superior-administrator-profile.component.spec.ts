import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperiorAdministratorProfileComponent } from './superior-administrator-profile.component';

describe('SuperiorAdministratorProfileComponent', () => {
  let component: SuperiorAdministratorProfileComponent;
  let fixture: ComponentFixture<SuperiorAdministratorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperiorAdministratorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperiorAdministratorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
