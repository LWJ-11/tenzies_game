import React, {useEffect} from "react";
import { useState } from "react";
import Die from "./components/Die.js";
import './styles/mainStyles.css'
import {nanoid} from "nanoid" 
import Confetti from 'react-confetti'

function App() {
  //Tạo state chứa các object dice với hàm allNewDice
  const [dice, setDice] = useState(allNewDice);

  const [tenzies, setTenzies] = useState(false);


  useEffect(() => {
    const allHeld =  dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
    }

    // setDice(oldDice => oldDice.every(die => {
    //   die.isHeld && die.value === oldDice[0] ? setTenzies(true) : setTenzies(tenzies)
    // }))

  }, [dice]) 

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
    if(!tenzies){
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld? 
        die : 
        generateNewDice()
      }))
    }
    else{
      setTenzies(!tenzies)
      setDice(allNewDice())
    }
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
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
