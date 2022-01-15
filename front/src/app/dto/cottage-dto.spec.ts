import { Cottage } from '../model/cottage';
import { CottageDTO } from './cottage-dto';

describe('CottageDTO', () => {
  it('should create an instance', () => {
    expect(new CottageDTO(new Cottage(), 0, 0)).toBeTruthy();
  });
});
