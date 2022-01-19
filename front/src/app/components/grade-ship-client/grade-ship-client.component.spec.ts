import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeShipClientComponent } from './grade-ship-client.component';

describe('GradeShipClientComponent', () => {
  let component: GradeShipClientComponent;
  let fixture: ComponentFixture<GradeShipClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeShipClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeShipClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
