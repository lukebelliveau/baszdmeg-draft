import React, { useState } from "react";
import "./App.css";

const rollDie = () => Math.ceil(Math.random() * 6);

const getDiceRoll = () => {
  const dice = [rollDie(), rollDie(), rollDie(), rollDie(), rollDie()];

  return dice;
};

const App = () => {
  let [dice, setDice] = useState([
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
    { value: -1, isSelected: false },
  ]);

  const rollDice = () => {
    const diceRoll = getDiceRoll();

    let newDice = [...dice];

    for (var i = 0; i < diceRoll.length; i++) {
      if (!newDice[i].isSelected) {
        newDice[i].value = diceRoll[i];
      }
    }

    setDice(newDice);
  };

  const selectDie = (index) => {
    let newDice = [...dice];

    newDice[index].isSelected = true;

    newDice.sort((die1, die2) => {
      if (die1.isSelected && !die2.isSelected) return false;
      return true;
    });

    setDice(newDice);
  };

  return (
    <div className="App">
      <div>
        {dice.map((die, index) => (
          <Die
            value={die.value}
            isSelected={die.isSelected}
            select={() => selectDie(index)}
            key={index}
          />
        ))}
      </div>
      <button onClick={() => rollDice()}>Roll dice</button>
    </div>
  );
};

const Die = ({ value, isSelected, select }) => (
  <div style={styles.die}>
    <div>{value}</div>
    <div style={styles.selectButton}>
      {isSelected ? (
        <div style={styles.selected}>SELECTED</div>
      ) : (
        <button onClick={() => select()}>Select</button>
      )}
    </div>
  </div>
);

const styles = {
  die: {
    "border-bottom": "black 1px solid",
  },
  selectButton: {
    "min-height": "15px",
    padding: "5px",
  },
  selected: {
    color: "red",
  },
};

export default App;
