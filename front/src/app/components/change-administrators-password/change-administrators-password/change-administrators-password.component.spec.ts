import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAdministratorsPasswordComponent } from './change-administrators-password.component';

describe('ChangeAdministratorsPasswordComponent', () => {
  let component: ChangeAdministratorsPasswordComponent;
  let fixture: ComponentFixture<ChangeAdministratorsPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAdministratorsPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAdministratorsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
