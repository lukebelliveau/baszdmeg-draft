const allHands = {
  ones: "three ones",
  twos: "three twos",
  threes: "three threes",
  fours: "three fours",
  fives: "three fives",
  sixes: "three sixes",
  onePair: "1PAIR",
  twoPair: "2PAIR",
  threeKind: "3KIND",
  fourKind: "4KIND",
  flush: "FLUSH",
  fullHouse: "FULL HOUSE",
  straight: "STRAIGHT",
  baszdmeg: "BASZDMEG",
};

const determinePlayableHands = (dice) => {
  const playableHands = [];

  // SCHOOL & 3/4KIND
  const valueCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  for (var i = 0; i < dice.length; i++) {
    const currentDie = dice[i];

    valueCounts[currentDie.value]++;
  }
  if (valueCounts[1] >= 3) {
    playableHands.push(allHands.ones);
    playableHands.push(allHands.threeKind);
    if (valueCounts[1] >= 4) playableHands.push(allHands.fourKind);
  }
  if (valueCounts[2] >= 3) {
    playableHands.push(allHands.twos);
    playableHands.push(allHands.threeKind);
    if (valueCounts[2] >= 4) playableHands.push(allHands.fourKind);
  }
  if (valueCounts[3] >= 3) {
    playableHands.push(allHands.threes);
    playableHands.push(allHands.threeKind);
    if (valueCounts[3] >= 4) playableHands.push(allHands.fourKind);
  }
  if (valueCounts[4] >= 3) {
    playableHands.push(allHands.fours);
    playableHands.push(allHands.threeKind);
    if (valueCounts[4] >= 4) playableHands.push(allHands.fourKind);
  }
  if (valueCounts[5] >= 3) {
    playableHands.push(allHands.fives);
    playableHands.push(allHands.threeKind);
    if (valueCounts[5] >= 4) playableHands.push(allHands.fourKind);
  }
  if (valueCounts[6] >= 3) {
    playableHands.push(allHands.sixes);
    playableHands.push(allHands.threeKind);
    if (valueCounts[6] >= 4) playableHands.push(allHands.fourKind);
  }

  // PAIRS
  let pairCount = 0;
  if (valueCounts[1] >= 2) {
    pairCount++;
  }
  if (valueCounts[2] >= 2) {
    pairCount++;
  }
  if (valueCounts[3] >= 2) {
    pairCount++;
  }
  if (valueCounts[4] >= 2) {
    pairCount++;
  }
  if (valueCounts[5] >= 2) {
    pairCount++;
  }
  if (valueCounts[6] >= 2) {
    pairCount++;
  }
  if (pairCount >= 1) playableHands.push(allHands.onePair);
  if (pairCount >= 2) playableHands.push(allHands.twoPair);

  // FULLHOUSE
  if (
    (valueCounts[1] === 2 ||
      valueCounts[2] === 2 ||
      valueCounts[3] === 2 ||
      valueCounts[4] === 2 ||
      valueCounts[5] === 2 ||
      valueCounts[6] === 2) &&
    (valueCounts[1] === 3 ||
      valueCounts[2] === 3 ||
      valueCounts[3] === 3 ||
      valueCounts[4] === 3 ||
      valueCounts[5] === 3 ||
      valueCounts[6] === 3)
  ) {
    playableHands.push(allHands.fullHouse);
  }

  // FLUSH
  // 1/6, 2/5, 3/4 are pairs of colors

  if (
    valueCounts[1] + valueCounts[6] === 5 ||
    valueCounts[2] + valueCounts[5] === 5 ||
    valueCounts[3] + valueCounts[4] === 5
  ) {
    playableHands.push(allHands.flush);
  }

  // STRAIGHT
  if (
    valueCounts[1] === 1 &&
    valueCounts[2] === 1 &&
    valueCounts[3] === 1 &&
    valueCounts[4] === 1 &&
    valueCounts[5] === 1
  ) {
    playableHands.push(allHands.straight);
  }
  if (
    valueCounts[2] === 1 &&
    valueCounts[3] === 1 &&
    valueCounts[4] === 1 &&
    valueCounts[5] === 1 &&
    valueCounts[6] === 1
  ) {
    playableHands.push(allHands.straight);
  }

  // BASZDMEG
  if (
    valueCounts[1] === 5 ||
    valueCounts[2] === 5 ||
    valueCounts[3] === 5 ||
    valueCounts[4] === 5 ||
    valueCounts[5] === 5
  ) {
    playableHands.push(allHands.baszdmeg);
  }

  return playableHands;
};

export default determinePlayableHands;
