import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsPageClientComponent } from './instructors-page-client.component';

describe('InstructorsPageClientComponent', () => {
  let component: InstructorsPageClientComponent;
  let fixture: ComponentFixture<InstructorsPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorsPageClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
