import React from "react";
import { useState } from "react";
import Die from "./components/Die.js";
import './styles/mainStyles.css'
import {nanoid} from "nanoid" 

function App() {
  //Tạo state chứa các object dice với hàm allNewDice
  const [dice, setDice] = useState(allNewDice);

  //gán các giá trị cho object dice
  function generateNewDice(){
    let randomNum = Math.floor(Math.random()*(6-1+1)+1)
    return {
        value:randomNum,
        isHeld: false,
        key: nanoid(),
        id: nanoid()
    }
  }
  //push các object dice vào mảng dice
  function allNewDice(){
    const dice = []
    for(let i = 0; i<10; i++){
      dice.push(generateNewDice())
    }
    return dice
  } 
  //roll các dice có giá trị isHeld: false
  function rollDice(){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld? 
      die : 
      generateNewDice()
    }))
  }
  //Click vào die có id được khai báo ở parameter bằng với die.id trong dice thì
  //gán giá trị isHeld của object đó bằng !isHeld, ngược lại thì giữ nguyên obj
  function holdDice(currentId){
    setDice(oldDice => oldDice.map(die => {
        return die.id === currentId ? 
        {...die, isHeld: !die.isHeld} 
        : die
      }))
  }
  //map() các obj trong dice với Die component
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
