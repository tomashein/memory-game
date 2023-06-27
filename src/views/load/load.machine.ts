import { assign, createMachine } from 'xstate';
import { fetchData, parseData } from '@utilities/data';
import { HttpError } from '@utilities/error';

const loadMachine = createMachine<Load.MachineContext>(
  {
    id: 'load',
    initial: 'gettingData',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      data: [],
      error: undefined,
    },
    states: {
      gettingData: {
        invoke: {
          src: 'getData',
          onDone: {
            target: 'preloadingImages',
            actions: ['setData'],
          },
          onError: {
            target: 'error',
            actions: ['setError'],
          },
        },
      },
      preloadingImages: {
        invoke: {
          src: 'preloadImages',
          onDone: {
            target: 'success',
          },
          onError: {
            target: 'error',
            actions: ['setError'],
          },
        },
      },
      error: {
        on: {
          RETRY_LOAD: {
            target: 'gettingData',
            actions: ['clearError'],
          },
        },
      },
      success: {
        type: 'final',
        data: ({ data }) => data,
      },
    },
  },
  {
    actions: {
      setData: assign({ data: (_context, event) => event.data }),
      clearError: assign({ error: () => undefined }),
      setError: assign({ error: (_context, event) => event.data }),
    },
    services: {
      getData: async () => {
        const data = await fetchData();
        const parsed = parseData(data);
        if (parsed.length < 9) {
          throw new Error('Not enough valid data entries.');
        }
        await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
        return parsed;
      },
      preloadImages: async ({ data }) => {
        try {
          const promises = data.map(({ image }) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = image;
              img.onload = () => resolve(true);
              img.onerror = () => reject(new Error());
            });
          });
          await Promise.all(promises);
          await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
        } catch (error) {
          throw new HttpError(404, 'At least one of the images was not found.', 'Not Found');
        }
      },
    },
  }
);

type LoadMachine = typeof loadMachine;

export type { LoadMachine };

export default loadMachine;
