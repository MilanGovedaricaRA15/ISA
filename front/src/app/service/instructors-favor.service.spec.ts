import { TestBed } from '@angular/core/testing';

import { InstructorsFavorService } from './instructors-favor.service';

describe('InstructorsFavorService', () => {
  let service: InstructorsFavorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorsFavorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
