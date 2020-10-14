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
  const playableHands = {};

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
    playableHands[allHands.ones] = valueCounts[1];
    playableHands[allHands.threeKind] = valueCounts[1];
    if (valueCounts[1] >= 4) playableHands[allHands.fourKind] = valueCounts[1];
  }
  if (valueCounts[2] >= 3) {
    const sumOfTwos = valueCounts[2] * 2;
    playableHands[allHands.twos] = sumOfTwos;
    playableHands[allHands.threeKind] = sumOfTwos;
    if (valueCounts[2] >= 4) playableHands[allHands.fourKind] = sumOfTwos;
  }
  if (valueCounts[3] >= 3) {
    const sumOfThrees = valueCounts[3] * 3;
    playableHands[allHands.threes] = sumOfThrees;
    playableHands[allHands.threeKind] = sumOfThrees;
    if (valueCounts[3] >= 4) playableHands[allHands.fourKind] = sumOfThrees;
  }
  if (valueCounts[4] >= 3) {
    const sumOfFours = valueCounts[4] * 4;
    playableHands[allHands.fours] = sumOfFours;
    playableHands[allHands.threeKind] = sumOfFours;
    if (valueCounts[4] >= 4) playableHands[allHands.fourKind] = sumOfFours;
  }
  if (valueCounts[5] >= 3) {
    const sumOfFives = valueCounts[5] * 5;
    playableHands[allHands.fives] = sumOfFives;
    playableHands[allHands.threeKind] = sumOfFives;
    if (valueCounts[5] >= 4) playableHands[allHands.fourKind] = sumOfFives;
  }
  if (valueCounts[6] >= 3) {
    const sumOfSixes = valueCounts[6] * 6;
    playableHands[allHands.sixes] = sumOfSixes;
    playableHands[allHands.threeKind] = sumOfSixes;
    if (valueCounts[6] >= 4) playableHands[allHands.fourKind] = sumOfSixes;
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
  if (pairCount >= 1) playableHands[allHands.onePair] = undefined;
  if (pairCount >= 2) playableHands[allHands.twoPair] = undefined;

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
    playableHands[allHands.fullHouse] = undefined;
  }

  // FLUSH
  // 1/6, 2/5, 3/4 are pairs of colors

  if (
    valueCounts[1] + valueCounts[6] === 5 ||
    valueCounts[2] + valueCounts[5] === 5 ||
    valueCounts[3] + valueCounts[4] === 5
  ) {
    playableHands[allHands.flush] = undefined;
  }

  // STRAIGHT
  if (
    valueCounts[1] === 1 &&
    valueCounts[2] === 1 &&
    valueCounts[3] === 1 &&
    valueCounts[4] === 1 &&
    valueCounts[5] === 1
  ) {
    playableHands[allHands.straight] = undefined;
  }
  if (
    valueCounts[2] === 1 &&
    valueCounts[3] === 1 &&
    valueCounts[4] === 1 &&
    valueCounts[5] === 1 &&
    valueCounts[6] === 1
  ) {
    playableHands[allHands.straight] = undefined;
  }

  // BASZDMEG
  if (
    valueCounts[1] === 5 ||
    valueCounts[2] === 5 ||
    valueCounts[3] === 5 ||
    valueCounts[4] === 5 ||
    valueCounts[5] === 5
  ) {
    playableHands[allHands.baszdmeg] = undefined;
  }

  console.log(playableHands);
  return playableHands;
};

export default determinePlayableHands;
