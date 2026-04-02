import React, { useState } from 'react';

const GameOver = ({ moves, onSave, onCancel }) => {
  const [pseudo, setPseudo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pseudo.trim()) {
      onSave(pseudo.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>🎉 Victoire ! 🎉</h2>
        <p>Vous avez gagné en {moves} coups !</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrez votre pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            maxLength={20}
            autoFocus
          />
          <button type="submit">Sauvegarder le score</button>
        </form>
      </div>
    </div>
  );
};

export default GameOver;