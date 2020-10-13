import React, { useState } from "react";
import "./App.css";
import determinePlayableHands from "./determinePlayableHands";

const rollDie = () => {
  const number = Math.ceil(Math.random() * 6);

  return number;
};

const getDiceRoll = () => {
  const dice = [rollDie(), rollDie(), rollDie(), rollDie(), rollDie()];

  return dice;
};

const sortDice = (dice) => {
  const selected = [];
  const notSelected = [];

  for (var i = 0; i < dice.length; i++) {
    if (dice[i].isSelected) selected.unshift(dice[i]);
    else notSelected.unshift(dice[i]);
  }

  const merged = selected.concat(notSelected);

  return merged;
};

const App = () => {
  let [dice, setDice] = useState([
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
  ]);

  let [playableHands, setPlayableHands] = useState([]);

  const rollDice = () => {
    // generate a new dice roll
    const diceRoll = getDiceRoll();

    let newDice = [...dice];

    for (var i = 0; i < diceRoll.length; i++) {
      if (!newDice[i].isSelected) {
        newDice[i].value = diceRoll[i];
      }
    }

    const playableHands = determinePlayableHands(newDice);

    setPlayableHands(playableHands);
    setDice(newDice);
  };

  const selectOrUnselectDie = (index) => {
    let newDice = [...dice];

    newDice[index].isSelected = !newDice[index].isSelected;

    newDice.sort((die1, die2) => {
      if (die1.isSelected && !die2.isSelected) return false;
      return true;
    });

    setDice(sortDice(newDice));
  };

  return (
    <div className="App">
      <div>
        {dice.map((die, index) => (
          <Die
            value={die.value}
            isSelected={die.isSelected}
            selectOrUnselect={() => selectOrUnselectDie(index)}
            key={index}
          />
        ))}
      </div>
      <button onClick={() => rollDice()}>Roll dice</button>
      <h3>Playable hands</h3>
      <div>
        {playableHands.map((hand, index) => (
          <div key={index}>{hand}</div>
        ))}
      </div>
    </div>
  );
};

const Die = ({ value, isSelected, selectOrUnselect }) => {
  let color;

  if (value === 1 || value === 6) color = "red";
  else if (value === 2 || value === 5) color = "black";
  else if (value === 3 || value === 4) color = "blue";

  return (
    <div style={styles.die}>
      <div style={{ color }}>{value}</div>
      <div style={styles.selectButton}>
        <button onClick={() => selectOrUnselect()}>
          {isSelected ? "Unselect" : "Select"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  die: {
    borderBottom: "black 1px solid",
  },
  selectButton: {
    minHeight: "15px",
    padding: "5px",
  },
  selected: {
    fontWeight: "bold",
  },
};

export default App;
