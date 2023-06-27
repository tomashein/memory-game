import { assign, createMachine } from 'xstate';
import { loadMachine } from '@views/load';
import { menuMachine } from '@views/menu';
import { gameMachine } from '@views/game';

const appMachine = createMachine<App.MachineContext>(
  {
    id: 'app',
    initial: 'load',
    context: {
      data: [],
      user: undefined,
      theme: undefined,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    entry: ['getTheme', 'getUser'],
    on: {
      TOGGLE_THEME: {
        actions: ['setTheme', 'toggleTheme'],
      },
    },
    states: {
      load: {
        invoke: {
          id: 'load',
          src: loadMachine,
          onDone: {
            target: 'menu',
            actions: ['setData'],
          },
        },
      },
      menu: {
        invoke: {
          id: 'menu',
          src: menuMachine,
          data: (context) => ({
            data: context.data,
          }),
          onDone: [
            {
              target: 'game',
              actions: ['setUser'],
              cond: (_context, event) => !!event.data,
            },
            {
              target: 'game',
              cond: (context) => !!context.user,
            },
          ],
        },
      },
      game: {
        invoke: {
          id: 'game',
          src: gameMachine,
          data: (context) => ({
            data: context.data,
            user: context.user,
            cards: [],
            hits: 0,
            errors: 0,
          }),
          onDone: 'menu',
        },
      },
    },
  },
  {
    actions: {
      getTheme: assign({
        theme: () => {
          const value = localStorage.getItem('theme') || 'dark';
          if (value === 'dark') {
            document.documentElement.classList.add('dark');
          }
          return value;
        },
      }),
      setTheme: assign({ theme: ({ theme }) => (theme === 'dark' ? 'light' : 'dark') }),
      toggleTheme: ({ theme }) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      },
      setData: assign({ data: (_context, event) => event.data }),
      getUser: assign({ user: () => localStorage.getItem('user') || undefined }),
      setUser: assign({
        user: (_context, event) => {
          localStorage.setItem('user', event.data);
          return event.data;
        },
      }),
    },
  }
);

export default appMachine;
