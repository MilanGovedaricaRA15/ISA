import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottagesPageComponent } from './cottages-page.component';

describe('CottagesPageComponent', () => {
  let component: CottagesPageComponent;
  let fixture: ComponentFixture<CottagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottagesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
