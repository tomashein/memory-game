import { useSelector } from '@xstate/react';
import Button from '@components/button';
import Modal from '@components/modal';
import useGame from '@hooks/useGame';

const GameOver = () => {
  const { actor } = useGame();
  const show = useSelector(actor, (state) => state.matches('end'));
  const data = useSelector(actor, ({ context }) => {
    return { user: context.user, hits: context.hits, errors: context.errors };
  });

  const handleClose = () => {
    actor.send({ type: 'GO_MENU' });
  };

  return (
    <Modal title={`Congratulations ${data.user}`} open={show} onClose={handleClose}>
      <p className="mb-2">You have completed the game in {data.hits + data.errors} turns.</p>
      <p className="mb-4">You have made {data.errors} mistake(s).</p>
      <div>
        <Button onClick={handleClose}>Back to Menu</Button>
      </div>
    </Modal>
  );
};

export default GameOver;
