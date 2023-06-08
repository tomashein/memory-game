import { useSelector } from '@xstate/react';
import Button from '@components/button';
import Modal from '@components/modal';
import useApp from '@hooks/useApp';
import styles from './game-over.module.css';

type GameOverProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GameOver = ({ isOpen, onClose }: GameOverProps) => {
  const { service } = useApp();
  const { user, score } = useSelector(service, ({ context }) => context);

  const handleAccept = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={() => onClose()} title={`Congratulations ${user}`}>
      <p className="mb-2">You have completed the game in {score.hits + score.errors} turns.</p>
      <p className="mb-4">You have made {score.errors} mistake(s).</p>
      <div className={styles.gameOver_actions}>
        <Button onClick={handleAccept} variant="primary">
          Home
        </Button>
      </div>
    </Modal>
  );
};

export default GameOver;
