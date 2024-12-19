const simulateShot = (): boolean => Math.random() < 0.7;

type Score = {
  teamA: number;
  teamB: number;
};

type HistoryEntry = {
  shotNumber: number;
  score: string;
  teamActualScore: number;
  teamBactualScore: number;
};

const updateScore = (score: Score, teamActualScore: number, teamBactualScore: number): Score => ({
  teamA: score.teamA + teamActualScore,
  teamB: score.teamB + teamBactualScore,
});

const createHistoryEntry = (
  shotNumber: number,
  score: Score,
teamActualScore: number,
  teamBactualScore: number): HistoryEntry => ({
  shotNumber,
  score: `${score.teamA}/${score.teamB}`,
  teamActualScore,
  teamBactualScore,
});

// Fonction d'affichage de l'historique
const displayHistory = (history: HistoryEntry[]): void => {
  history.forEach((entry) => {
    console.log(
      `Tir ${entry.shotNumber} : Score : ${entry.score} (Équipe A : ${entry.teamActualScore} | Équipe B : ${entry.teamBactualScore})`
    );
  });
};

// Fonction principale pour gérer une séance de tirs au but
const penaltyShootout = (history: HistoryEntry[] = [], score: Score = { teamA: 0, teamB: 0 }, shotNumber: number = 1): void => {
  const teamAScored = simulateShot() ? 1 : 0;
  const teamBScored = simulateShot() ? 1 : 0;

  const newScore = updateScore(score, teamAScored, teamBScored);
  const newEntry = createHistoryEntry(shotNumber, newScore, teamAScored, teamBScored);

  const newHistory = [...history, newEntry];
  displayHistory(newHistory);

  if (newScore.teamA !== newScore.teamB || shotNumber >= 5) {
    if (shotNumber >= 5 && newScore.teamA === newScore.teamB) {
      console.log("Prolongation nécessaire !");
      penaltyShootout(newHistory, newScore, shotNumber + 1);
    } else {
      console.log(
        `Victoire : ${newScore.teamA > newScore.teamB ? "Équipe A" : "Équipe B"} (Score : ${newScore.teamA}/${newScore.teamB})`
      );
    }
  } else {
    penaltyShootout(newHistory, newScore, shotNumber + 1);
  }
};

// Exemple d'exécution de la séance de tirs au but
penaltyShootout();
