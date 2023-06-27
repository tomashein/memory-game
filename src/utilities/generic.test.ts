import { describe, expect, test } from 'vitest';
import { shuffleArray } from './generic';

describe('shuffleArray', () => {
  test('should shuffle data and return a different result', async () => {
    const dataMock = [1, 2, 3, 4, 5];
    const response = shuffleArray(dataMock);
    expect(response).not.toStrictEqual(dataMock);
  });
});
