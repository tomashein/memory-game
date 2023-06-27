import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import appMachine from './app.machine';

export const AppContext = createContext({ service: {} as InterpreterFrom<typeof appMachine> });

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const service = useInterpret(appMachine);

  return <AppContext.Provider value={{ service }}>{children}</AppContext.Provider>;
};
