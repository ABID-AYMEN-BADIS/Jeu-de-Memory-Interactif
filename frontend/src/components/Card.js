import React from 'react';

const Card = ({ card, onClick }) => {
  const handleClick = () => {
    onClick(card);
  };

  return (
    <div
      className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      {card.isFlipped ? card.emoji : '?'}
    </div>
  );
};

export default Card;