import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultsPageClientComponent } from './faults-page-client.component';

describe('FaultsPageClientComponent', () => {
  let component: FaultsPageClientComponent;
  let fixture: ComponentFixture<FaultsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
