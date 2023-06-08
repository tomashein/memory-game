import { useSelector } from '@xstate/react';
import useApp from '@hooks/useApp';
import styles from './score.module.css';

const Score = () => {
  const { service } = useApp();
  const { hits, errors } = useSelector(service, ({ context }) => context.score);

  console.count('score');

  return (
    <div className={styles.score}>
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
