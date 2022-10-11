import React, { useState, useEffect, useCallback, useRef } from 'react';

import './App.css';

function App() {

  //deaclare variables
  const ballHeight = 40
  const fieldHeight = 850
  const fieldWidth = 1560
  const playerHeight = 75
  
  const middleX = fieldWidth / 2
  const middleY = fieldHeight / 2
  
  //useStates - starting positions
  const [positionPlayer, setPositionPlayer] = useState({y: middleY-playerHeight, x: fieldWidth-1490})
  const [ballAxisY, setBallAxisY] = useState (middleY-ballHeight/2) // 57 is the TOP, 866 bottom
  const [ballAxisX, setBallAxisX] = useState (middleX-ballHeight/2)
  //const [increment, setIncrement] = useState(0.1)
  const incrementRefY = useRef(Math.round(Math.random()*100)%2 === 0 ? 10 : -10) //Aleatoriamente se decidirá si va hacia arriba o hacia abajo
  const incrementRefX = useRef(Math.round(Math.random()*100)%2 === 0 ? 10 : -10) //Aleatoriamente se decidirá si va hacia la izquierda o la derecha
  //setInterval(()=> ballMovement, 1000)
  
  
  const ballMovementY = useCallback(() => {

    //Si la pelota se sale del campo por abajo, invertimos el sentido de la pelota.
    if (ballAxisY > fieldHeight - ballHeight)incrementRefY.current = -incrementRefY.current
    //Si la pelota se sale del campo por arriba, invertimos el sentido de la pelota.
    if (ballAxisY < 0 + ballHeight/4)incrementRefY.current = -incrementRefY.current
    setBallAxisY(ballAxisY + incrementRefY.current)
    
  }, [incrementRefY, ballAxisY])
  
  
  const ballMovementX = useCallback(() => {

    if (ballAxisX > fieldWidth - positionPlayer.x * 2 && ballAxisY > positionPlayer.y && ballAxisY < positionPlayer.y + playerHeight * 2){
      incrementRefX.current = -incrementRefX.current
      } else if (ballAxisX > fieldWidth - ballHeight){ //Si la pelota se sale del campo por la izquierda, invertimos el sentido de la pelota.
        incrementRefX.current = -incrementRefX.current
        } else if (ballAxisX < 0 + ballHeight/4){ //Si la pelota se sale del campo por la derecha, invertimos el sentido de la pelota.
          incrementRefX.current = -incrementRefX.current}
    
    setBallAxisX(ballAxisX + incrementRefX.current)
    
  }, [incrementRefX, ballAxisX, ballAxisY ,positionPlayer])
  
  
  useEffect(() => {
      setTimeout(ballMovementX, 16) //16
      setTimeout(ballMovementY, 16)
    }, [ballMovementX, ballMovementY, ballAxisY])


  
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
  
  const handleMovement = (e : any) => {
    
    if (e.keyCode === 40){  //DOWN 693 //RIGHT 1506
      setPositionPlayer({...positionPlayer, y: clamp (positionPlayer.y + 15, 0, fieldHeight - playerHeight * 2)})
    } else if(e.keyCode === 38){  //UP 0 //LEFT 30
      setPositionPlayer({...positionPlayer, y: clamp (positionPlayer.y - 15, 0, fieldHeight + playerHeight * 2)})
    }
  }



  return (
    <div  className="app">
      <h1 style={{color: 'white'}}>{/*top: {position}*/}</h1>
      <div tabIndex={0} onKeyDown={handleMovement} className='field' style={{height:fieldHeight, width:fieldWidth}}>
        <div className='player-side'>
          <div className='player' id='player' style={{top: positionPlayer.y}}></div>
        </div>
        <div className='enemy-side'><span style={{color:'white'}}>ball: {ballAxisX}</span></div>
        <div className='ball' id='ball' style={{ top: ballAxisY, right: ballAxisX, zIndex: 10}}></div>
        <div style={{height: fieldHeight}} className='divider' />
      </div>
    </div>
  );
}

export default App;
