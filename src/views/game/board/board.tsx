import { useSelector } from '@xstate/react';
import useGame from '@hooks/useGame';
import Card from '@components/card';
import './board.css';

const Board: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { actor } = useGame();
  const cards = useSelector(actor, ({ context }) => context.cards);

  return (
    <div className="board">
      {children}
      {cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
};

export default Board;
