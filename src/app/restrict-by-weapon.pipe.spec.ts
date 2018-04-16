import { RestrictByWeaponPipe } from './restrict-by-weapon.pipe';

describe('RestrictByWeaponPipe', () => {
  it('create an instance', () => {
    const pipe = new RestrictByWeaponPipe();
    expect(pipe).toBeTruthy();
  });
});
