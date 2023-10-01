import Link from 'next/link';
import React from 'react';

import { Action } from '../types/action';

type AdditionalParam = {
  title_h3: string;
  description: string;
};

type Card = {
  title_h3: string;
  description: string;
  call_to_action: Action;
  $: AdditionalParam;
};

type CardProps = {
  cards: [Card];
};

const CardSection = ({ cards }: CardProps) => {
  const renderCard = (card: Card, index: number) => (
    <div className="cards" key={index}>
      {card.title_h3 && <h3 {...(card.$?.title_h3 as {})}>{card.title_h3}</h3>}
      {card.description && (
        <p {...(card.$?.description as {})}>{card.description}</p>
      )}
      <div className="card-cta">
        {card.call_to_action.title && card.call_to_action.href && (
          <Link href={card.call_to_action.href}>
            <a className="btn primary-btn">{card.call_to_action.title}</a>
          </Link>
        )}
      </div>
    </div>
  );

  return <div className="demo-section">{cards?.map(renderCard)}</div>;
};

export default CardSection;
