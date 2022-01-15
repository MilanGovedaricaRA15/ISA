import { InstructorsFavor } from '../model/instructors-favor';
import { InstructorsFavorDTO } from './instructors-favor-dto';

describe('InstructorsFavorDTO', () => {
  it('should create an instance', () => {
    expect(new InstructorsFavorDTO(new InstructorsFavor(), 0, 0)).toBeTruthy();
  });
});
