import { Ship } from '../model/ship';
import { ShipDTO } from './ship-dto';

describe('ShipDTO', () => {
  it('should create an instance', () => {
    expect(new ShipDTO(new Ship(), 0, 0)).toBeTruthy();
  });
});
