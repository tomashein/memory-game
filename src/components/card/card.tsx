import clsx from 'clsx';
import type { ButtonProps } from 'react-html-props';
import type { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { CardMachine } from '.';
import './card.css';

type CardProps = Omit<ButtonProps, 'ref'> & {
  data: Game.Card;
};

const Card = ({ className, data, disabled, ...props }: CardProps) => {
  const actor = data.ref as ActorRefFrom<CardMachine>;
  const show = useSelector(actor, (state) => state.value !== 'idle');
  const classes = clsx('card', show && 'card--active', className);

  const handleClick = () => {
    actor.send({ type: 'CLICK', data: { id: data.id, title: data.title } });
  };

  return (
    <button className={classes} disabled={disabled || show} onClick={handleClick} type="button" {...props}>
      <div>
        <div className="card__front">
          <div>
            <img alt={data.title} src={data.image} />
          </div>
        </div>
        <div className="card__back" />
      </div>
    </button>
  );
};

export default Card;
