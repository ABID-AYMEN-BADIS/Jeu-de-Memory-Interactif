import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameOver from './components/GameOver';
import { saveScore, getScores } from './services/api';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐸'];

function App() {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [scores, setScores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [victoryAnimation, setVictoryAnimation] = useState(false);

  useEffect(() => {
    initializeGame();
    loadScores();
  }, []);

  const initializeGame = () => {
    const shuffledCards = shuffleCards([...EMOJIS, ...EMOJIS]);
    setCards(shuffledCards.map((emoji, index) => ({
      id: index,
      emoji: emoji,
      isFlipped: false,
      isMatched: false
    })));
    setMoves(0);
    setGameWon(false);
  };

  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const loadScores = async () => {
    const topScores = await getScores();
    setScores(topScores);
  };

  const handleCardClick = (clickedCard) => {
    if (gameWon) return;
    if (clickedCard.isMatched) return;
    
    const flippedCards = cards.filter(card => card.isFlipped && !card.isMatched);
    
    if (flippedCards.length === 2) return;
    if (flippedCards.length === 1 && flippedCards[0].id === clickedCard.id) return;

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const updatedFlippedCards = newCards.filter(card => card.isFlipped && !card.isMatched);
    
    if (updatedFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkMatch(updatedFlippedCards[0], updatedFlippedCards[1]);
    }
  };

  const checkMatch = (card1, card2) => {
    if (card1.emoji === card2.emoji) {
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          )
        );
        
        setCards(prevCards => {
          const allMatched = prevCards.every(card => 
            card.isMatched || (card.id === card1.id || card.id === card2.id)
          );
          if (allMatched) {
            setTimeout(() => {
              setGameWon(true);
              setShowModal(true);
              setVictoryAnimation(true);
              setTimeout(() => setVictoryAnimation(false), 500);
            }, 100);
          }
          return prevCards;
        });
      }, 200);
    } else {
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
      }, 1000);
    }
  };

  const handleSaveScore = async (pseudo) => {
    const success = await saveScore(pseudo, moves);
    if (success) {
      await loadScores();
    }
    setShowModal(false);
    initializeGame();
  };

  const handleNewGame = () => {
    initializeGame();
  };

  return (
    <div className="app">
      <h1>🎮 Jeu de Memory 🎮</h1>
      <div className="game-container">
        <div className="game-main">
          <div className="stats">
            <div className="counter">
              Coups : <span>{moves}</span>
            </div>
            <button className="new-game-btn" onClick={handleNewGame}>
              Nouvelle partie
            </button>
          </div>
          <Board cards={cards} onCardClick={handleCardClick} victoryAnimation={victoryAnimation} />
        </div>
        <ScoreBoard scores={scores} />
      </div>
      {showModal && (
        <GameOver moves={moves} onSave={handleSaveScore} onCancel={initializeGame} />
      )}
    </div>
  );
}

export default App;