import React from 'react';
import './App.css';

const initState = {
  squares: Array(9).fill(undefined),
  xIsNext: true,
  gameOver: false,
  squaresFilled: [],  
  trackPlayer: []
}

class Board extends React.Component {
  constructor(props) {
    super(props)
      this.state = initState;
  }

  calculateWinner = (player) => {
    const { squares } = this.state;

    const winningLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  
    for (let a = 0; a < winningLines.length; a++) {
      let totalWinningPosition = 0;
      const winnerLine = winningLines[a];

      for (let b = 0; b < winnerLine.length; b++) {
        const winnerPosition = winnerLine[b];

        if (squares[winnerPosition] === player) {
          totalWinningPosition++;
        }
      }
      console.log(totalWinningPosition,winnerLine.length)
      if (totalWinningPosition === winnerLine.length) {
        this.setState({ gameOver: true, winner: player })
      }    
    }
  }

  playerMove = (squares, position, player) => {
    squares[position] = player;
    // this.state.trackPlayer.push(this.currentPlayer());
    // this.state.squaresFilled.push(position)
    // console.log("before", this.state)
    this.setState({
      squaresFilled: this.state.squaresFilled.concat([position]),
      squares: squares,
      trackPlayer: this.state.trackPlayer.concat([player]),
      xIsNext: !this.state.xIsNext,
      
    }, () => {
      this.calculateWinner(player);
      this.computerMove(squares, this.currentPlayer())
    })
    // console.log("after", this.state)
  }

  playerClick = (position) => {
    const squares = this.state.squares.slice();
    const isSquareEmpty = squares[position] === undefined
    if (isSquareEmpty && (this.state.gameOver === false)) { 
      this.playerMove(squares, position, this.currentPlayer())
    }
  }

  renderSquare = (position) => {
    return (
      <div className='squares' onClick={() => this.playerClick(position)}>
        {this.state.squares[position]} 
      </div>
    )
  }

  currentPlayer = () => this.state.xIsNext ? 'X' : 'O'

  renderMessaging = () => {
    if (this.state.gameOver) {
      return <div>{this.state.winner + ' is the Winner!'}</div>
    } else {
      return <div>{'Next Player: ' + this.currentPlayer()}</div>
    }
  }

  renderBoard = () => {
    return [0,3,6].map((value) => {
      
      return (
        <div className='row'>
          {this.renderSquare(value)}
          {this.renderSquare(value + 1)}
          {this.renderSquare(value + 2)}
        </div>
      )
    })
  }

  playerHistory = () => {
    return this.state.trackPlayer.map(player => 
      (
      <tr>
        {player}
      </tr>
      )
    )
    
  }
  renderTable = () => {
    return this.state.squaresFilled.map(element =>
      <tr>
        position {element} has been taken
      </tr>
    )
  }

  computerPlayer = () => {
    const squares = this.state.squares.slice();
    const {squaresFilled} = this.state
    let possibleMoves = [0,1,2,3,4,5,6,7,8]
    let possibleMovesLeft = possibleMoves.filter(x => !squaresFilled.includes(x))
    // console.log(possibleMovesLeft)
    let index = Math.floor(Math.random() * possibleMovesLeft.length)
    return possibleMovesLeft[index]
    // let computerPosition = possibleMovesLeft[index]
    // this.playerMove(squares, computerPosition, this.currentPlayer())
  }

  computerMove = (squares, player) => {
    // const {squares} = this.state
    console.log(this.state.squaresFilled)
    let computerMove = this.computerPlayer()
    squares[computerMove] = player
    // const updateSquare = [computerMove]
    
    // this.state.squaresFilled.push(computerMove)

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      trackPlayer: this.state.trackPlayer,
      squaresFilled: this.state.squaresFilled.concat([computerMove]),
    }, () => this.calculateWinner(player))
    this.state.trackPlayer.push(this.currentPlayer());
  }

  render() {

    return (
      <div className='row-1 d-flex justify-content-center Game'>
        <div className="col-7">  
          <div className='status'>
            {this.renderMessaging()}
          </div>
          <table className="tabletext">
            <tr>
              <th>Player</th>
              <th>Move</th>
            </tr>
            <tr>
              <td>
                <div>
                  {this.playerHistory()}
                </div>
              </td>
              <td>
                <div>
                  {this.renderTable()}
                </div>
              </td>
            </tr>
          </table>
        </div>
          <div className='Board'>
            {this.renderBoard()} 
          </div>
      </div>
    )
  }
}

export default Board;