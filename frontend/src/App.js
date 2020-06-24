import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state = ({
      resSize: 3,
      size: 3,
      symbol: 'o',
      boxStates: new Array(9).fill().map((elem, i) => '-'),
    })
    this.handleChange = this.handleChange.bind(this)
    this.reset = this.reset.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.boxClick = this.boxClick.bind(this)
  }

  componentDidMount(){
    this.reset()
  }

  reset(){
    this.setState({size: 3})
  }

  handleChange(e){
    let val = parseInt(e.target.value)
    console.log(val)
    if (val >= 3 && val <= 9){
      this.setState({
        resSize: val
      })
    }
  }

  handleClick(){
    let size = this.state.resSize;
    console.log(size)
    this.setState({
      size: size,
      boxStates: new Array(size*size).fill().map((elem, i) => '-')
    })
  }
  

  boxClick = index =>{
    console.log('clicked')
    let symbol = this.state.symbol
    let newBoxStates = this.state.boxStates
    if (newBoxStates[index] === '-'){
      newBoxStates[index] = symbol
      let newSymbol = (symbol === 'o') ? 'x' : 'o'
      this.setState({
        symbol: newSymbol,
        boxStates: newBoxStates,
      })
      let won = check(newBoxStates, index, symbol, this.state.size)
      if (won){
        console.log("Winner")
      }
    }
  }

  render(){
    let size = this.state.size
    console.log('size', size)
    let grid = new Array(size).fill().map((elem, i) => i)
    console.log(grid)

    return (
      <div className='main'>
        <div className='header'>
          <label className='label1'>Grid Size: </label>
          <input onChange={this.handleChange}/>
          <label className='btn' onClick={this.handleClick}>Submit</label>
        </div>
        <div className='name'>Tic-Tac-Toe</div>
        <div className='grid'>
          {grid.map((elem, rowIndex) => (
              <div key={`row${rowIndex}`} className='row'
              style={{height: `${(100/this.state.size)}%`}}>
                {/* Each row will have size amount of columns */}
                {grid.map((elem, index)=> (
                  // index + (size*rowIndex) = unique index from 0-8 for 3x3 grid
                  <label key={index + (size*rowIndex)} onClick={() => this.boxClick(index + (size*rowIndex))}
                  style={{width: `${(100/this.state.size)}%`}}>
                    {/* style={{width: `${(100/this.state.size)}%`}}  */}
                    {this.state.boxStates[index + (size*rowIndex)]}
                  </label>
                ))}
              </div>
          ))}
        </div>
        <div className='footer'></div>
      </div>
    )
  }
}
export default App;

// check if pos is out of bounds
function checkPos(index, totalSize){
  if (index < 0 || index >= totalSize){
    return false
  }
  return true
}

function getCount(grid, index, status, size, symbol){
  let count = 0
  let totalSize = size*size
  while(checkPos(index, totalSize)){
    let remainder = index % size
    if (grid[index] === symbol){ count++ }
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
    else if (status === 'diag1-left'){ index -= (size+1) }
    else if (status === 'diag1-right'){ index += (size+1) }
    else if (status === 'diag2-left'){ index += (size-1) }
    else if (status === 'diag2-right'){ index -= (size-1) }
  }
  return count
}

function check(boxStates, index, symbol, size){
  // curr position is symbol, so count = 1
  let count = 1 
  let remainder = index % size

  // vertically
  // up
  count += getCount(boxStates, index-size, 'up', size, symbol)
  // down
  count += getCount(boxStates, index+size, 'down', size, symbol)
  if (count === size){ return true}
  count = 1

  // horizontally
  // left
  if (remainder !== 0){
    count += getCount(boxStates, index-1, 'left', size, symbol)
  }
  // right
  if (remainder !== (size-1)){
    count += getCount(boxStates, index+1, 'right', size, symbol)
  }
  if (count === size){ return true}
  count = 1

  // slope down diagonal
  // diag-left
  count += getCount(boxStates, index-(size+1), 'diag1-left', size, symbol)
  // diag-right
  count += getCount(boxStates, index+(size+1), 'diag1-right', size, symbol)
  if (count === size){ return true}
  count = 1

  // slope up diagonal 
  // diag-left
  count += getCount(boxStates, index+(size-1), 'diag2-left', size, symbol)
  // diag-right
  count += getCount(boxStates, index-(size-1), 'diag2-right', size, symbol)
  if (count === size){ return true}

  return false
}
