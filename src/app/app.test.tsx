import { describe, expect, test } from 'vitest';
import { interpret } from 'xstate';
import appMachine from './app.machine';

describe('App Machine', () => {
  test('should eventually reach "menu"', () => {
    let data: App.Content[];
    let user: string;
    const mockAppMachine = appMachine.withConfig({
      actions: {
        setData: () => {
          data = [];
        },
        getUser: () => {
          user = 'username';
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
    const appService = interpret(mockAppMachine).onTransition(async (state) => {
      if (state.matches('menu')) {
        expect(data).toStrictEqual([]);
        expect(user).toBe('username');
      }
    });
    appService.start();
  });
});
