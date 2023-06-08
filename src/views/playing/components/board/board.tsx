import { useSelector } from '@xstate/react';
import Card from '@components/card';
import useApp from '@hooks/useApp';
import styles from './board.module.css';

const Board = () => {
  const { service } = useApp();
  const cards = useSelector(service, ({ context }) => context.cards);

  console.count('board');

  return (
    <div className={styles.board}>
      {cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
};

export default Board;
