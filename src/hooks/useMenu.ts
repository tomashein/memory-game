import type { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { MenuMachine } from '@views/menu';
import useApp from './useApp';

const useMenu = () => {
  const { service } = useApp();
  const actor = useSelector(service, ({ children }) => children.menu) as ActorRefFrom<MenuMachine>;

  return { actor };
};

export default useMenu;
