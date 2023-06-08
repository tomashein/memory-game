import { memo } from 'react';
import { useSelector } from '@xstate/react';
import Card from '@components/card';
import useApp from '@hooks/useApp';
import styles from './hero.module.css';

export const Hero = () => {
  const { service } = useApp();
  const cards = useSelector(service, ({ context }) => context.cards);

  if (!cards) return null;

  const selected = cards.reduce((acc, cur) => {
    if (!cur.id.startsWith('-') && acc.length < 2) {
      return [...acc, { ...cur, active: true, matched: true }];
    }
    return acc;
  }, [] as Game.Card[]);

  return (
    <div className={styles.hero}>
      {selected.map((card) => (
        <Card key={card.id} data={card} disabled tabIndex={undefined} />
      ))}
    </div>
  );
};

const MemoizedHero = memo(Hero);

export default MemoizedHero;
