import { memo } from 'react';
import { useSelector } from '@xstate/react';
import Card from '@components/card';
import useMenu from '@hooks/useMenu';
import './hero.css';

const Hero = () => {
  const { actor } = useMenu();
  const cards = useSelector(actor, ({ context }) => context.cards);

  return (
    <div className="hero">
      {cards.map((card) => (
        <Card className="card--active" key={card.id} data={card} disabled tabIndex={undefined} />
      ))}
    </div>
  );
};

const MemoizedHero = memo(Hero);

export default MemoizedHero;
