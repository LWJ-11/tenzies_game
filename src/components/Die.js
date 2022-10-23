import React from "react";
import '../styles/die.css'

 function Die(props){
    //nếu isHeld: true (được click vào) thì màu sẽ chuyển thành xanh lá, ngược lại là màu trắng
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div 
            className="die-face"
            style={styles} //truyền style
            onClick={props.holdDice} //truyền hàm holdDice
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
 }

 export default Die;