import { memo } from 'react';
import clsx from 'clsx';
import type { ButtonProps } from 'react-html-props';
import useApp from '@hooks/useApp';
import styles from './card.module.css';

type CardProps = ButtonProps & {
  data: Game.Card;
  disabled?: boolean;
};

export const Card = ({ data, disabled, ...props }: CardProps) => {
  const { service } = useApp();
  const { send } = service;

  const { active, matched } = data;

  const classes = clsx(styles.card, active && styles.card_active);

  const handleClick = () => {
    if (!disabled) {
      send({ type: 'CLICK_CARD', data });
    }
  };

  return (
    <button className={classes} onClick={handleClick} disabled={matched} tabIndex={0} {...props}>
      <div>
        <div className={styles.card_front}>
          <img alt={data.title} src={data.image} />
        </div>
        <div className={styles.card_back} />
      </div>
    </button>
  );
};

const MemoizedCard = memo(Card);

export default MemoizedCard;
