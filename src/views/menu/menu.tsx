import { Fragment, useState } from 'react';
import { useSelector } from '@xstate/react';
import { Transition } from '@headlessui/react';
import Button from '@components/button';
import useApp from '@hooks/useApp';
import Hero from './components/hero';
import RequestName from './components/request-name';
import styles from './menu.module.css';

const Menu = () => {
  const [showContent, setShowContent] = useState(true);
  const [showNameRequest, setShowNameRequest] = useState(false);
  const { service } = useApp();
  const user = useSelector(service, ({ context }) => context.user);
  const { send } = service;

  const handlePlayButton = () => {
    if (!user) {
      setShowNameRequest(true);
    } else {
      setShowContent(false);
      setTimeout(() => {
        send({ type: 'GO_PLAY' });
      }, 700);
    }
  };

  const handleCloseModal = (data?: string) => {
    setShowNameRequest(false);
    if (data) {
      setShowContent(false);
      setTimeout(() => {
        send({ type: 'SET_USER', data });
      }, 700);
    }
  };

  return (
    <Fragment>
      <Transition
        appear={true}
        show={showContent}
        as={Fragment}
        enter="ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className={styles.menu}>
          <Hero />
          <h1>A MEMORY GAME</h1>
          <p>ANIMALS</p>
          <Button className="min-w-[8rem]" size="lg" onClick={handlePlayButton} variant="light">
            Play
          </Button>
        </div>
      </Transition>
      <RequestName isOpen={showNameRequest} onClose={handleCloseModal} />
    </Fragment>
  );
};

export default Menu;
