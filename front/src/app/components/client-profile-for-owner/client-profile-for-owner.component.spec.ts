import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileForOwnerComponent } from './client-profile-for-owner.component';

describe('ClientProfileForOwnerComponent', () => {
  let component: ClientProfileForOwnerComponent;
  let fixture: ComponentFixture<ClientProfileForOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProfileForOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileForOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
