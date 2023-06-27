import { actions, assign, createMachine, raise, sendTo, spawn } from 'xstate';
import { cardMachine } from '@components/card';
import { shuffleArray } from '@utilities/generic';

const { pure } = actions;

type CardInfo = {
  id: string;
  title: string;
};

type GameMachineContext = {
  data: App.Content[];
  user: string;
  cards: Game.Card[];
  hits: number;
  errors: number;
  first: CardInfo | undefined;
  second: CardInfo | undefined;
};

const gameMachine = createMachine<GameMachineContext>(
  {
    id: 'game',
    initial: 'load',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      data: [],
      user: '',
      cards: [],
      hits: 0,
      errors: 0,
      first: undefined,
      second: undefined,
    },
    states: {
      load: {
        always: {
          target: 'play',
          actions: ['selectCards', 'shuffleCards'],
        },
      },
      play: {
        always: {
          target: 'end',
          cond: 'didGameEnd',
        },
        on: {
          ACTIVATE_CARD: {
            actions: ['handleCard'],
          },
          CLEAR_CARDS: {
            actions: ['clearCards'],
          },
        },
      },
      end: {
        on: {
          GO_MENU: 'final',
        },
      },
      final: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      selectCards: assign({
        cards: ({ data }) => {
          return data.slice(0, 9).reduce((acc, card) => {
            return acc.concat([
              { ...card, ref: spawn(cardMachine, card.id) },
              { ...card, id: `-${card.id}`, ref: spawn(cardMachine, `-${card.id}`) },
            ]);
          }, [] as Game.Card[]);
        },
      }),
      shuffleCards: assign({ cards: ({ cards }) => shuffleArray(cards) }),
      setFirst: assign({ first: (_context, event) => event.data }),
      setSecond: assign({ second: (_context, event) => event.data }),
      matchCards: pure(({ first, second }) => {
        if (first && second) {
          if (first.title === second.title)
            return [
              assign({ hits: ({ hits }) => hits + 1 }),
              sendTo(first.id, { type: 'MATCH' }),
              sendTo(second.id, { type: 'MATCH' }),
              raise({ type: 'CLEAR_CARDS' }),
            ];
          else
            return [
              assign({ errors: ({ errors }) => errors + 1 }),
              sendTo(first.id, { type: 'DEACTIVATE' }, { delay: 1000 }),
              sendTo(second.id, { type: 'DEACTIVATE' }, { delay: 1000 }),
              raise({ type: 'CLEAR_CARDS' }, { delay: 1000 }),
            ];
        }
        return;
      }),
      clearCards: assign(() => ({ first: undefined, second: undefined })),
      handleCard: pure(({ first, second }, event) => {
        if (!first) {
          return ['setFirst', sendTo(event.data.id, { type: 'ACTIVATE' })];
        }
        if (!second) {
          return ['setSecond', sendTo(event.data.id, { type: 'ACTIVATE' }), 'matchCards'];
        }
        return;
      }),
    },
    guards: {
      didGameEnd: ({ hits }) => hits > 8,
    },
  }
);

type GameMachine = typeof gameMachine;

export type { GameMachine };

export default gameMachine;
