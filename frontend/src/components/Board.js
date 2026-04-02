import React from 'react';
import Card from './Card';

const Board = ({ cards, onCardClick, victoryAnimation }) => {
  return (
    <div className={`board ${victoryAnimation ? 'victory-animation' : ''}`}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default Board;