import { assign, createMachine } from 'xstate';
import { pure, send } from 'xstate/lib/actions';
import { fetchCards } from '@helpers/game';
import { shuffleArray } from '@helpers/utils';

type AppContext = {
  user?: string;
  cards: Game.Card[];
  error?: Error;
  score: Game.Score;
  active?: string;
};

const machine = createMachine<AppContext>(
  {
    id: 'app',
    initial: 'loading',
    predictableActionArguments: true,
    context: {
      user: undefined,
      cards: [],
      error: undefined,
      score: {
        hits: 0,
        errors: 0,
      },
      active: undefined,
    },
    states: {
      loading: {
        invoke: {
          src: 'getCards',
          onDone: {
            target: 'menu',
            actions: ['setCards', 'shuffleCards'],
          },
          onError: {
            target: 'error',
            actions: ['setError'],
          },
        },
      },
      error: {
        on: {
          RETRY: {
            target: 'loading',
            actions: ['clearError'],
          },
        },
      },
      menu: {
        on: {
          SET_USER: {
            target: 'playing',
            actions: ['setUser'],
          },
          GO_PLAY: {
            target: 'playing',
          },
        },
      },
      playing: {
        on: {
          CLICK_CARD: {
            actions: ['handleCard'],
          },
          DEACTIVE_CARDS: {
            actions: ['deactiveCards'],
          },
          GAME_OVER: {
            target: 'end',
          },
        },
      },
      end: {
        always: [
          {
            target: 'menu',
            actions: ['resetScore', 'resetCards', 'shuffleCards'],
          },
        ],
      },
    },
  },
  {
    actions: {
      setCards: assign({ cards: (_ctx, event) => event.data }),
      setError: assign({ error: (_ctx, event) => event.data }),
      setUser: assign({ user: (_ctx, event) => event.data }),
      handleCard: pure(({ cards }, event) => {
        const matched = [];
        const active: Game.Card[] = [];
        let isActive = false;
        let isMatched = false;
        cards.forEach((card) => {
          if (card.matched) {
            matched.push(card);
            if (card.id === event.data.id) isMatched = true;
          } else if (card.active) {
            active.push(card);
            if (card.id === event.data.id) isActive = true;
          }
        });
        if (matched.length === cards.length || isActive || isMatched) return;
        switch (active.length) {
          case 0:
            return ['activateCard'];
          case 1:
            return ['activateCard', 'checkMatch'];
          default:
            return;
        }
      }),
      activateCard: assign(({ cards, active, ...ctx }, event) => {
        const updatedCards = cards.map((card) => {
          if (card.id === event.data.id) return { ...card, active: true };
          return card;
        });
        return { ...ctx, cards: updatedCards, active: active || event.data.title };
      }),
      checkMatch: pure((ctx, event) => {
        if (event.data.title === ctx.active) {
          return ['matchCards'];
        }
        return send('DEACTIVE_CARDS', { delay: 1000 });
      }),
      matchCards: assign(({ cards, active, score, ...ctx }) => {
        const updatedCards = cards.map((card) => {
          if (card.title === active) return { ...card, matched: true };
          return card;
        });
        return { ...ctx, cards: updatedCards, active: undefined, score: { ...score, hits: score.hits + 1 } };
      }),
      deactiveCards: assign(({ cards, score, ...ctx }) => {
        const updatedCards = cards.map((card) => {
          if (card.active && !card.matched) return { ...card, active: false };
          return card;
        });
        return { ...ctx, cards: updatedCards, active: undefined, score: { ...score, errors: score.errors + 1 } };
      }),
      resetScore: assign({ score: () => ({ hits: 0, errors: 0 }) }),
      resetCards: assign({ cards: ({ cards }) => cards.map((card) => ({ ...card, active: false, matched: false })) }),
      shuffleCards: assign({ cards: ({ cards }) => shuffleArray(cards) }),
      clearError: assign({ error: () => undefined }),
    },
    services: {
      getCards: () => fetchCards(),
    },
  }
);

export default machine;
