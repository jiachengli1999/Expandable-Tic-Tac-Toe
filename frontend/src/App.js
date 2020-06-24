import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state = ({
      size: 3,
      symbol: 'o',
      boxStates: new Array(9).fill().map((elem, i) => '-'),
    })
    this.handleChange = this.handleChange.bind(this)
    this.reset = this.reset.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.boxClick = this.boxClick.bind(this)
    this.check = this.check.bind(this)
  }

  componentDidMount(){
    this.reset()
  }

  reset(){
    this.setState({size: 3})
  }

  handleChange(e){
    let val = e.target.value
    console.log(val)
    if (val > 3 && val < 6){
      this.setState({size: val})
    }
  }

  handleClick(){
    let size = this.state.size;
    console.log(size)
    // this.setState({grid: new Array(size).fill().map((elem, i) => i)})
  }

  // params: index, symbol
  check = params =>{
    let count = 0

    // vertically
    // up
    // down

    // horizontally
    // left
    // right

    // slope down diagonal
    // diag-left
    // diag-right

    // slope up diagonal 
    // diag-left
    // diag-right

  }

  boxClick = index =>{
    console.log('clicked')
    let symbol = this.state.symbol
    let newBoxStates = this.state.boxStates
    newBoxStates[index] = symbol
    let newSymbol = (symbol === 'o') ? 'x' : 'o'
    this.setState({
      symbol: newSymbol,
      boxStates: newBoxStates,
    })
    this.check([index, symbol])
  }

  render(){
    let size = this.state.size
    let grid = new Array(size).fill().map((elem, i) => i)

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
              <div key={`row${rowIndex}`} className='row'>
                {/* Each row will have size amount of columns */}
                {grid.map((elem, index)=> (
                  // index + (size*rowIndex) = unique index from 0-8 for 3x3 grid
                  <label key={index + (size*rowIndex)} onClick={() => this.boxClick(index + (size*rowIndex))}>
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
