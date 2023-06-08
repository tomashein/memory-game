import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useSelector } from '@xstate/react';
import useApp from '@hooks/useApp';
import Board from './components/board';
import Header from './components/header';
import Score from './components/score';
import GameOver from './components/game-over';
import styles from './playing.module.css';

const Playing = () => {
  const [showContent, setShowContent] = useState(true);
  const { service } = useApp();
  const gameOver = useSelector(service, ({ context }) => context.score.hits > 8);

  const handleGameOver = () => {
    setShowContent(false);
    setTimeout(() => {
      service.send('GAME_OVER');
    }, 700);
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
        <div className={styles.playing}>
          <Header />
          <div>
            <Score />
            <Board />
          </div>
        </div>
      </Transition>
      <GameOver isOpen={gameOver} onClose={handleGameOver} />
    </Fragment>
  );
};

export default Playing;
