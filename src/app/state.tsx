import { PropsWithChildren, createContext } from 'react';
import { useInterpret } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import machine from './machine';

export const AppContext = createContext({ service: {} as InterpreterFrom<typeof machine> });

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const service = useInterpret(machine);

  return <AppContext.Provider value={{ service }}>{children}</AppContext.Provider>;
};
