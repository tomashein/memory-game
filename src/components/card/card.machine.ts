import { DoneInvokeEvent, actions, createMachine, sendParent } from 'xstate';

const { pure } = actions;

type ClickEvent = DoneInvokeEvent<{ data: { id: string; title: string } }>;

const cardMachine = createMachine(
  {
    initial: 'idle',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      active: false,
      matched: false,
    },
    states: {
      idle: {
        on: {
          CLICK: {
            actions: ['handleClick'],
          },
          ACTIVATE: {
            target: 'active',
          },
        },
      },
      active: {
        on: {
          MATCH: {
            target: 'matched',
          },
          DEACTIVATE: {
            target: 'idle',
          },
        },
      },
      matched: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      handleClick: pure((_context, event: ClickEvent) => sendParent({ type: 'ACTIVATE_CARD', data: event.data })),
    },
  }
);

type CardMachine = typeof cardMachine;

export type { CardMachine };

export default cardMachine;
