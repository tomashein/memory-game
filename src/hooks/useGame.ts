import type { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import type { GameMachine } from '@views/game';
import useApp from './useApp';

const useGame = () => {
  const { service } = useApp();
  const actor = useSelector(service, ({ children }) => children.game) as ActorRefFrom<GameMachine>;

  return { actor };
};

export default useGame;
