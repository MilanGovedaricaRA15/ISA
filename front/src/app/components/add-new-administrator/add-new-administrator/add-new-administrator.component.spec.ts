import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAdministratorComponent } from './add-new-administrator.component';

describe('AddNewAdministratorComponent', () => {
  let component: AddNewAdministratorComponent;
  let fixture: ComponentFixture<AddNewAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
