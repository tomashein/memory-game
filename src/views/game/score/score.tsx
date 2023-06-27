import { useSelector } from '@xstate/react';
import useGame from '@hooks/useGame';
import './score.css';

const Score = () => {
  const { actor } = useGame();
  const hits = useSelector(actor, ({ context }) => context.hits);
  const errors = useSelector(actor, ({ context }) => context.errors);

  return (
    <div className="score">
      <div>
        Hits: <span>{hits}</span>
      </div>
      <div>
        Errors: <span>{errors}</span>
      </div>
    </div>
  );
};

export default Score;
