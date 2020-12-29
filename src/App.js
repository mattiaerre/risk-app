import { useState } from 'react';
import { battle } from 'risk-core';
import './App.css';

function makeDescription(result) {
  if (result === null) {
    return '';
  }
  let description = '';
  if (result.defender.lost !== 0) {
    description += `Defender loses ${result.defender.lost} ${
      result.defender.lost === 1 ? 'troop' : 'troops'
    }`;
  }
  if (result.attacker.lost !== 0) {
    if (description.length > 0) {
      description += ', and ';
    }
    description += `Attacker loses ${result.attacker.lost} ${
      result.attacker.lost === 1 ? 'troop' : 'troops'
    }`;
  }
  return description;
}

function App() {
  const [attackerDice, setAttackerDice] = useState(3);
  const [defenderDice, setDefenderDice] = useState(2);
  const [result, setResult] = useState(null);

  return (
    <main className="App__main">
      <label>
        <select onChange={(e) => setAttackerDice(parseInt(e.target.value, 10))}>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
        attacker
      </label>
      <label>
        <select onChange={(e) => setDefenderDice(parseInt(e.target.value, 10))}>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
        defender
      </label>
      <button
        onClick={() => {
          setResult(battle({ attacker: attackerDice, defender: defenderDice }));
        }}
      >
        3, 2, 1 ...
      </button>
      <button onClick={() => setResult(null)}>Clear</button>
      <code>{JSON.stringify(result, null, 2)}</code>
      <p>{makeDescription(result)}</p>
    </main>
  );
}

export default App;
