import type { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { LoadMachine } from '@views/load';
import useApp from './useApp';

const useLoad = () => {
  const { service } = useApp();
  const actor = useSelector(service, ({ children }) => children.load) as ActorRefFrom<LoadMachine>;

  return { actor };
};

export default useLoad;
