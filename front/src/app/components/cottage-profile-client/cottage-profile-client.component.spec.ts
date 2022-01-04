import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageProfileClientComponent } from './cottage-profile-client.component';

describe('CottageProfileClientComponent', () => {
  let component: CottageProfileClientComponent;
  let fixture: ComponentFixture<CottageProfileClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageProfileClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
