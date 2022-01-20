import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsPageClientComponent } from './complaints-page-client.component';

describe('ComplaintsPageClientComponent', () => {
  let component: ComplaintsPageClientComponent;
  let fixture: ComponentFixture<ComplaintsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
