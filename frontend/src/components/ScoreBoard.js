import React from 'react';

const ScoreBoard = ({ scores }) => {
  return (
    <div className="scores-sidebar">
      <h2>🏆 Meilleurs scores 🏆</h2>
      {scores.length === 0 ? (
        <div className="no-scores">Aucun score enregistré</div>
      ) : (
        <ul className="scores-list">
          {scores.map((score, index) => (
            <li key={index} className="score-item">
              <span className="score-rank">#{index + 1}</span>
              <span className="score-pseudo">{score.pseudo}</span>
              <span className="score-value">{score.coups} coups</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScoreBoard;