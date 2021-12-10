import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottagesPageClientComponent } from './cottages-page-client.component';

describe('CottagesPageClientComponent', () => {
  let component: CottagesPageClientComponent;
  let fixture: ComponentFixture<CottagesPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottagesPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottagesPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
