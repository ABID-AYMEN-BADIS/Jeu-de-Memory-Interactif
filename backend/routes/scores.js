const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// GET /api/scores - Récupère les 5 meilleurs scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ coups: 1, date: 1 })
      .limit(5);
    res.json(scores);
  } catch (error) {
    console.error('Erreur lors de la récupération des scores:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/scores - Enregistre un nouveau score
router.post('/', async (req, res) => {
  try {
    const { pseudo, coups } = req.body;
    
    if (!pseudo || pseudo.trim() === '') {
      return res.status(400).json({ error: 'Le pseudo est requis' });
    }
    
    if (typeof coups !== 'number' || coups < 0) {
      return res.status(400).json({ error: 'Le nombre de coups est invalide' });
    }
    
    const newScore = new Score({
      pseudo: pseudo.trim(),
      coups: coups
    });
    
    await newScore.save();
    
    res.json({ 
      success: true, 
      message: 'Score sauvegardé',
      score: newScore
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du score:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;