import { useSelector } from '@xstate/react';
import useApp from '@hooks/useApp';
import LoadView from '@views/load';
import MenuView from '@views/menu';
import GameView from '@views/game';

const AppRouter = () => {
  const { service } = useApp();
  const state = useSelector(service, (state) => state);

  switch (state.value) {
    case 'load':
      return <LoadView />;
    case 'menu':
      return <MenuView />;
    case 'game':
      return <GameView />;
    default:
      return false;
  }
};

export default AppRouter;
