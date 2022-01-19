import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeEntityClientComponent } from './grade-entity-client.component';

describe('GradeEntityClientComponent', () => {
  let component: GradeEntityClientComponent;
  let fixture: ComponentFixture<GradeEntityClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeEntityClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeEntityClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
