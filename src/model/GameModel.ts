
function getModel() {
  return {
    id: 0,
    balance: 10000,
    features: {
      trySpin: 1,
      section: [
        { id: 0, weight: 4, credits: 5000 },
        { id: 1, weight: 100, credits: 200 },
        { id: 2, weight: 20, credits: 1000 },
        { id: 3, weight: 50, credits: 400 },
        { id: 4, weight: 10, credits: 2000 },
        { id: 5, weight: 100, credits: 200 },
        { id: 6, weight: 20, credits: 1000 },
        { id: 7, weight: 50, credits: 400 },
      ],
    },
  };
}
export const GameModel = { getModel };
