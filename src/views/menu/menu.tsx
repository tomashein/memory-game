import { useSelector } from '@xstate/react';
import Button from '@components/button';
import Footer from '@components/footer';
import Header from '@components/header';
import useApp from '@hooks/useApp';
import useMenu from '@hooks/useMenu';
import RequestName from './request-name';
import Hero from './hero';
import './menu.css';

const MenuView = () => {
  const { service } = useApp();
  const { actor } = useMenu();
  const isUser = useSelector(service, ({ context }) => context.user && context.user !== '');

  const handlePlayButton = () => {
    if (isUser) {
      actor.send({ type: 'START_GAME' });
    } else {
      actor.send({ type: 'TOGGLE_MODAL' });
    }
  };

  return (
    <div className="menu">
      <Header className="menu__header">
        <Hero />
      </Header>
      <main className="menu__main">
        <Button className="menu__start" onClick={handlePlayButton}>
          START
        </Button>
      </main>
      <Footer className="menu__footer" />
      <RequestName />
    </div>
  );
};

export default MenuView;
