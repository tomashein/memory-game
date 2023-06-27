import { describe, expect, test } from 'vitest';
import { interpret } from 'xstate';
import loadMachine from './load.machine';

describe('Load Machine', () => {
  test('should eventually reach "success"', () => {
    let data: App.Content[];
    const mockLoadMachine = loadMachine.withConfig({
      actions: {
        setData: () => {
          data = [];
        },
      },
      services: {
        getData: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([]);
            }, 50);
          }),
      },
    });
    const loadService = interpret(mockLoadMachine).onTransition(async (state) => {
      if (state.matches('success')) {
        expect(data).toStrictEqual([]);
      }
    });
    loadService.start();
  });
});
