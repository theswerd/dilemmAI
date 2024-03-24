function generatePairCombinations(players) {
  // Function to check if the combination is unique
  function isUnique(pair1, pair2, combinations) {
    return !combinations.some(combo =>
      combo.some(set =>
        set[0] === pair1[0] && set[1] === pair1[1] &&
        combo.some(set =>
          set[0] === pair2[0] && set[1] === pair2[1]
        )
      )
    );
  }

  // Generate all 2-player combinations
  const allPairs = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      allPairs.push([players[i], players[j]]);
    }
  }

  // Find all unique combinations of pairs
  const uniqueCombinations = [];
  for (let i = 0; i < allPairs.length; i++) {
    for (let j = i + 1; j < allPairs.length; j++) {
      // Make sure no player is in both pairs
      if (allPairs[i].some(p => allPairs[j].includes(p))) continue;

      // Check if this combination is unique
      if (isUnique(allPairs[i], allPairs[j], uniqueCombinations)) {
        uniqueCombinations.push([allPairs[i], allPairs[j]]);
      }
    }
  }

  return uniqueCombinations;
}

// Players array
const players = [1, 2, 3, 4];

// Generate and log out the pair combinations
const pairCombinations = generatePairCombinations(players);
console.log(pairCombinations);
