import {updateScore, createHistoryEntry } from "../penalty";



describe("updateScore", () => {
  it("should update the score correctly", () => {
    const initialScore = { teamA: 1, teamB: 2 };
    const result = updateScore(initialScore, 1, 0);
    expect(result).toEqual({ teamA: 2, teamB: 2 });
  });

  it("should be immutable", () => {
    const initialScore = { teamA: 1, teamB: 2 };
    updateScore(initialScore, 1, 0);
    expect(initialScore).toEqual({ teamA: 1, teamB: 2 });
  });
});

describe("createHistoryEntry", () => {
  it("should create a valid history entry", () => {
    const shotNumber = 1;
    const score = { teamA: 2, teamB: 1 };
    const teamAChange = 1;
    const teamBChange = 0;

    const result = createHistoryEntry(shotNumber, score, teamAChange, teamBChange);

    expect(result).toEqual({
      shotNumber: 1,
      score: "2/1",
      teamAChange: 1,
      teamBChange: 0,
    });
  });
});
