import { cardMachine } from '@components/card';
import { shuffleArray } from '@utilities/generic';
import { assign, createMachine, spawn } from 'xstate';

type MenuMachineContext = {
  data: App.Content[];
  cards: Game.Card[];
  requestName: boolean;
};

const menuMachine = createMachine<MenuMachineContext>(
  {
    id: 'menu',
    initial: 'load',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      data: [],
      cards: [],
      requestName: false,
    },
    states: {
      load: {
        always: {
          target: 'idle',
          actions: ['selectCards'],
        },
      },
      idle: {
        on: {
          TOGGLE_MODAL: {
            actions: ['toggleModal'],
          },
          START_GAME: {
            target: 'done',
          },
        },
      },
      done: {
        type: 'final',
        data: (_context, event) => event.data,
      },
    },
  },
  {
    actions: {
      selectCards: assign({
        cards: ({ data }) => {
          const cards = shuffleArray(data);
          return cards.slice(0, 2).reduce((acc, card) => {
            return [...acc, { ...card, ref: spawn(cardMachine, card.id) }];
          }, [] as Game.Card[]);
        },
      }),
      toggleModal: assign({ requestName: (context) => !context.requestName }),
    },
  }
);

type MenuMachine = typeof menuMachine;

export type { MenuMachine };

export default menuMachine;
