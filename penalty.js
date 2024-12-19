var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var simulateShot = function () { return Math.random() < 0.7; };
var updateScore = function (score, teamActualScore, teamBactualScore) { return ({
    teamA: score.teamA + teamActualScore,
    teamB: score.teamB + teamBactualScore,
}); };
var createHistoryEntry = function (shotNumber, score, teamActualScore, teamBactualScore) { return ({
    shotNumber: shotNumber,
    score: "".concat(score.teamA, "/").concat(score.teamB),
    teamActualScore: teamActualScore,
    teamBactualScore: teamBactualScore,
}); };
var displayHistory = function (history) {
    history.forEach(function (e) {
        console.log("Tir ".concat(e.shotNumber, " : Score : ").concat(e.score, " (\u00C9quipe A : ").concat(e.teamActualScore, " | \u00C9quipe B : ").concat(e.teamBactualScore, ")"));
    });
};
var penaltyShootout = function (history, score, shotNumber) {
    if (history === void 0) { history = []; }
    if (score === void 0) { score = { teamA: 0, teamB: 0 }; }
    if (shotNumber === void 0) { shotNumber = 1; }
    var teamAScored = simulateShot() ? 1 : 0;
    var teamBScored = simulateShot() ? 1 : 0;
    var newScore = updateScore(score, teamAScored, teamBScored);
    var newEntry = createHistoryEntry(shotNumber, newScore, teamAScored, teamBScored);
    var newHistory = __spreadArray(__spreadArray([], history, true), [newEntry], false);
    displayHistory(newHistory);
    if (newScore.teamA !== newScore.teamB) {
        if (shotNumber >= 5 && newScore.teamA === newScore.teamB) {
            penaltyShootout(newHistory, newScore, shotNumber + 1);
        }
        else {
            console.log("Victoire : ".concat(newScore.teamA > newScore.teamB ? "Équipe A" : "Équipe B", " (Score : ").concat(newScore.teamA, "/").concat(newScore.teamB, ")"));
        }
    }
    else {
        penaltyShootout(newHistory, newScore, shotNumber + 1);
    }
};
penaltyShootout();
