import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteRequestClientComponent } from './account-delete-request-client.component';

describe('AccountDeleteRequestClientComponent', () => {
  let component: AccountDeleteRequestClientComponent;
  let fixture: ComponentFixture<AccountDeleteRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDeleteRequestClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeleteRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
