import React, { Component } from 'react';
import './App.css';

const CURRENT = '#ffffb3'
const DEFAULT = 'rgb(22, 146, 125)'
const WIN_COLOR = '#efffcc'

class App extends Component{
  constructor(){
    super()
    this.state = ({
      name: '',
      playerIndex: 0,
      currPlayerIndex: 0,
      players: new Array(4).fill().map((elem, i) => ''),
      resSize: 3,
      size: 3,
      symbol: 'o',
      boxStates: new Array(9).fill().map((elem, i) => '-'),
      showModal: false,
      winner: null,
      resWinCondition: 3,
      winCondition: 3,
      disabled: false,
    })
    this.handleChange = this.handleChange.bind(this)
    this.reset = this.reset.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.boxClick = this.boxClick.bind(this)
    this.assignName = this.assignName.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
    this.addBot = this.addBot.bind(this)
    this.setWinCondition = this.setWinCondition.bind(this)
    this.changeWinCondition = this.changeWinCondition.bind(this)
    this.colorIndexes = this.colorIndexes.bind(this)
    this.resetColor.bind(this)
  }

  componentDidMount(){
    this.setState({size: 3})
  }

  reset(){
    let size = this.state.size
    let newBoxes = new Array(size*size).fill().map((elem, i) => '-')
    this.setState({
      boxStates: newBoxes, currPlayerIndex: 0, 
      winner: null, disabled: false
    })
    this.resetColor()
  }

  resetColor(){
    let boxes = document.getElementsByClassName('boxes')
    for (let i=0; i < boxes.length; i++){
      boxes[i].style.backgroundColor = DEFAULT
    }
  }

  // Get size input 
  handleChange(e){
    let val = parseInt(e.target.value)
    console.log(val)
    if (val >= 3 && val <= 9){
      this.setState({
        resSize: val
      })
    }
  }

  // Get new grid
  handleClick(){
    let size = this.state.resSize;
    console.log(size)
    this.setState({
      size: size,
      boxStates: new Array(size*size).fill().map((elem, i) => '-'),
      winner: null,
      currPlayerIndex: 0,
      winCondition: size,
      disabled: false
    })
    this.resetColor()
  }
  

  boxClick = index =>{
    console.log('clicked')
    console.log('index:', index)


    if (this.state.playerIndex < 1){ return }
    let newBoxStates = this.state.boxStates
    if (newBoxStates[index] === '-' && !this.state.winner){
      // disable setWinCondition
      this.setState({disabled: true})

      // let symbol = this.state.symbol
      let currPlayerIndex = this.state.currPlayerIndex
      let currPlayer = this.state.players[currPlayerIndex]
      let symbol = currPlayer[2]
      newBoxStates[index] = symbol
      // let newSymbol = (symbol === 'o') ? 'x' : 'o'
      let newPlayerIndex = currPlayerIndex + 1
      newPlayerIndex = (newPlayerIndex >= this.state.playerIndex) ? 0 : newPlayerIndex
      this.setState({
        currPlayerIndex: newPlayerIndex,
        boxStates: newBoxStates,
      })
      // Get array of successful indexes or null 
      let win = check(newBoxStates, index, symbol, this.state.size, this.state.winCondition)
      console.log('win', win)
      if (win){
        // update winner's score
        let currPlayers = this.state.players
        currPlayers[currPlayerIndex][1] += 1
        this.setState({players: currPlayers, winner: currPlayers[currPlayerIndex][0]})
        // // Add model to say winner and option to reset curr grid 
        // this.OpenModal()
        this.colorIndexes(win)

        console.log("Winner")
      }
    }
  }

  assignName(e){
    this.setState({name: e.target.value})
  }

  addBot(){
  
  }

  addPlayer(){
    if (this.state.name !== '' && this.state.playerIndex < 4){
      let newPlayers = this.state.players
      let index = this.state.playerIndex
      let symbol = getSymbol(index)
      // store [name, score, symbol]
      newPlayers[index] = [this.state.name, 0, symbol]
      this.setState({
        playerIndex: index + 1,
        players: newPlayers
      })
    }
  }

  setWinCondition(e){
    let num = parseInt(e.target.value)
    if (num >= 3 && num <= this.state.size){
      this.setState({resWinCondition: num})
    }
  }
  
  changeWinCondition(){
    let num = this.state.resWinCondition
    if (num >= 3 && num <= this.state.size){
      this.setState({winCondition: num})
    }
  }

  colorIndexes = array =>{
    let boxes = document.getElementsByClassName('boxes')
    for(let i =0; i< array.length; i++){
      boxes[array[i]].style.backgroundColor = WIN_COLOR
    }
  }

  render(){
    let message = this.state.winner ? 'Winner: '+this.state.winner : 'Tic-Tac-Toe'
    let size = this.state.size
    let player_count = this.state.playerIndex
    console.log('size', size)
    let grid = new Array(size).fill().map((elem, i) => i)

    return (
      <div className='main'>
        {/* <MyModal showModal={this.state.showModal} closeModal={this.CloseModal}/> */}
        <div className='header'>
          <label className='label1'>Grid Size: </label>
          <input onChange={this.handleChange} placeholder='3 -> 9'/>
          <label className='btn' onClick={this.handleClick}>Submit</label>
          <div className='add_player'>
            <input onChange={this.assignName} placeholder='Bob'/>
            <label className='btn' onClick={this.addPlayer}>Add Player</label>
            {/* <label className='btn' onClick={this.addBot}>Add Bot</label> */}
          </div>
          <div className='win_condition'>
            <label className='win-label'>Win Condition:</label>
            <input onChange={this.setWinCondition} placeholder='3 -> size'
            disabled={this.state.disabled}/>
            <label className='btn' onClick={this.changeWinCondition}>Submit</label>
          </div>
          <label className='reset btn' onClick={this.reset}>Reset</label>
        </div>
        <div className='msg'>{message}</div>
        <div>
          <div className='instr'>Begin by adding 2 players</div>
          <div className='display_win_condition'>
            <div className='statement'>Win Condition:</div> 
            <div className='num'>{this.state.winCondition}</div>
          </div>
          <div className='display_grid_size'>
            <div className='statement'>Grid Size:</div> 
            <div className='grid_size'>{this.state.size}X{this.state.size}</div>
          </div>
        </div>
        <div className='body'>
          <div className='players'>
            {[...Array(player_count)].map((e, i) => (
                <div className='player' key={`p${i}`} style={{height: `${100/player_count}%`}}>
                  <label className='player-name' 
                  style={{backgroundColor: i === this.state.currPlayerIndex ? CURRENT : DEFAULT}}>
                    {this.state.players[i][0]}, symbol: {this.state.players[i][2]}
                  </label>
                  <label className='score'>{this.state.players[i][1]}</label>
                </div>
            ))}
          </div>
          <div className='grid'>
            {grid.map((elem, rowIndex) => (
                <div key={`row${rowIndex}`} className='row'
                style={{height: `${(100/this.state.size)}%`}}>
                  {/* Each row will have size amount of columns */}
                  {grid.map((elem, index)=> (
                    // index + (size*rowIndex) = unique index from 0-8 for 3x3 grid
                    <label key={index + (size*rowIndex)} 
                    className='boxes'
                    onClick={() => this.boxClick(index + (size*rowIndex))}
                    style={{width: `${(100/this.state.size)}%`}}>
                      {/* style={{width: `${(100/this.state.size)}%`}}  */}
                      {this.state.boxStates[index + (size*rowIndex)]}
                    </label>
                  ))}
                </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default App;

// returns the symbol for the corresponding player 
function getSymbol(index){
  let symbols = ['o', 'x', 's', 'q']
  return symbols[index]
}
// check if pos is out of bounds
function checkPos(index, totalSize){
  if (index < 0 || index >= totalSize){
    return false
  }
  return true
}

// remainder === 0 means elem on first column 
// remainder === size-1 means elem on last column 
// returns count of consecutive symbols
// returns a list of the symbols' index 
function getCount(grid, index, status, size, symbol){
  let count = 0
  let indexes = []
  let totalSize = size*size
  while(checkPos(index, totalSize)){
    let remainder = index % size
    if (grid[index] === symbol){ 
      count++ 
      indexes.push(index)
    }
    else{ break }

    if (status === 'up'){ index -= size}
    else if (status === 'down'){ index += size}
    else if (status === 'left'){
      // left most side so done 
      if (remainder === 0){ break }
      // else continue going left
      index--
    }
    else if (status === 'right'){
      if (remainder === size-1) { break }
      index++
    }
    else if (status === 'diag1-left'){ 
      if (remainder === 0){ break }
      index -= (size+1) 
    }
    else if (status === 'diag1-right'){ 
      if (remainder === size-1) { break }
      index += (size+1) 
    }
    else if (status === 'diag2-left'){ 
      if (remainder === 0){ break }
      index += (size-1) 
    }
    else if (status === 'diag2-right'){ 
      if (remainder === size-1) { break }
      index -= (size-1) 
    }
  }
  return [count, indexes]
}

function check(boxStates, index, symbol, size, win_condition){
  // curr position is symbol, so count = 1
  let count = 1 
  let remainder = index % size
  let indexes = [index]
  // vertically
  // up
  let result = getCount(boxStates, index-size, 'up', size, symbol)
  count += result[0]
  indexes.push(...result[1])
  console.log('up', count)
  // down
  result = getCount(boxStates, index+size, 'down', size, symbol)
  count += result[0]
  indexes.push(...result[1])
  console.log('down', count)
  console.log('vert', count)
  if (count === win_condition){ return indexes}
  count = 1
  indexes = [index]

  // horizontally
  // left
  if (remainder !== 0){
    result = getCount(boxStates, index-1, 'left', size, symbol)
    count += result[0]
    indexes.push(...result[1])
    console.log('left', count)
  }
  // right
  if (remainder !== (size-1)){
    result = getCount(boxStates, index+1, 'right', size, symbol)
    count += result[0]
    indexes.push(...result[1])
    console.log('right', count)
  }
  console.log('horz', count)
  if (count === win_condition){ return indexes}
  count = 1
  indexes = [index]

  // slope down diagonal
  // diag-left
  if (remainder !== 0){
    result = getCount(boxStates, index-(size+1), 'diag1-left', size, symbol)
    count += result[0]
    indexes.push(...result[1])
    console.log('diag1-left', count)
  }
  // diag-right
  if (remainder !== (size-1)){
    result = getCount(boxStates, index+(size+1), 'diag1-right', size, symbol)
    count += result[0]
    indexes.push(...result[1])
    console.log('diag1-right', count)
  }
  console.log('diag1', count)
  console.log('win_cond:', win_condition)
  if (count === win_condition){ return indexes}
  count = 1
  indexes = [index]

  // slope up diagonal 
  // diag-left
  if (remainder !== 0){
    result = getCount(boxStates, index+(size-1), 'diag2-left', size, symbol)
    count += result[0]
    indexes.push(...result[1])
    console.log('diag2-left', count)
  }
  // diag-right
  if (remainder !== (size-1)){
    result = getCount(boxStates, index-(size-1), 'diag2-right', size, symbol)
    count += result[0]
    indexes.push(...result[1])
    console.log('diag2-right', count)
  }
  console.log('diag2', count)
  if (count === win_condition){ return indexes}

  return null
}
