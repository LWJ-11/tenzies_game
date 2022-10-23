import React from "react";
import { useState } from "react";
import Die from "./components/Die.js";
import './styles/mainStyles.css'
import {nanoid} from "nanoid" 

function App() {
  const [dice, setDice] = useState(allNewDice);

  function generateNewDice(){
    let randomNum = Math.floor(Math.random()*(6-1+1)+1)
    return {
        value:randomNum,
        isHeld: false,
        key: nanoid(),
        id: nanoid()
    }
  }
  function allNewDice(){
    const dice = []
    for(let i = 0; i<10; i++){
      dice.push(generateNewDice())
    }
    return dice
  } 

  function rollDice(){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld? 
      die : 
      generateNewDice()
    }))
  }

  function holdDice(currentId){
    setDice(oldDice => oldDice.map(die => {
        return die.id === currentId ? 
        {...die, isHeld: !die.isHeld} 
        : die
      }))
  }
  const diceElement = dice.map(die => {
    return <Die key = {die.key} value = {die.value} isHeld = {die.isHeld} holdDice={() => holdDice(die.id)}/>
  })
  return (
    <main>
        <div className="dice-container">
          {diceElement}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
