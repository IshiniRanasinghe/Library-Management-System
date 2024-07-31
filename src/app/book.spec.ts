//book.spec.ts
import { Book } from './book';

describe('Member', () => {
  it('should create an instance', () => {
    expect(new Book()).toBeTruthy();
  });
});
