import { SimpleNumberPipe } from './simple-number.pipe';

describe('SignificantFiguresPipe', () => {
  it('create an instance', () => {
    const pipe = new SimpleNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
