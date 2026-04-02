const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getScores = async () => {
  try {
    const response = await fetch(`${API_URL}/scores`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des scores');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
};

export const saveScore = async (pseudo, coups) => {
  try {
    const response = await fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pseudo, coups }),
    });
    if (!response.ok) throw new Error('Erreur lors de la sauvegarde du score');
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Erreur:', error);
    return false;
  }
};