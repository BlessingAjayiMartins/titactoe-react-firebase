import React from 'react';
import './App.css';
import styled from 'styled-components'

const initState = {
  squares: Array(9).fill(undefined),
  xIsNext: true,
  gameOver: false,
  squaresFilled: [],  
  trackPlayer: [],
  p1: 0,
  p2: 0,
  tie: 0
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
    this.setState({
      squaresFilled: this.state.squaresFilled.concat([position]),
      squares: squares,
      trackPlayer: this.state.trackPlayer.concat([player]),
      xIsNext: !this.state.xIsNext,
      
    }, () => {
      this.calculateWinner(player);
      this.computerMove(squares, this.currentPlayer())
    })
    
  }

  playerClick = (position) => {
    const squares = this.state.squares.slice();
    const isSquareEmpty = squares[position] === undefined
    if (isSquareEmpty && (this.state.gameOver === false)) { 
      this.playerMove(squares, position, this.currentPlayer())
    }
    if (this.state.gameOver && this.state.winner === '😭' ) {
      this.setState({p1:this.state.p1 + 1})
      this.clearBoard()
    }
    if (this.state.gameOver && this.state.winner === '😈' ) {
      this.setState({p2:this.state.p2 + 1})
      this.clearBoard()
    }
    if (this.state.squaresFilled.length === 10) {
      this.clearBoard()
    } 
    if (this.state.squaresFilled.length === 10 && this.state.gameOver === false) {
      this.setState({tie: this.state.tie + 1})
      this.clearBoard()
    }
  }

  clearBoard = () => {
    this.setState({
      squares: Array(9).fill(undefined),
      xIsNext: true,
      gameOver: false,
      squaresFilled: [],  
      trackPlayer: [],
    })
  }

  renderSquare = (position) => {
      return (
        <div 
        className='squares' 
        data-cy={position} 
        onClick={() => this.playerClick(position)}
        >
        {this.state.squares[position]} 
        </div>
      )
    
  }

  currentPlayer = () => this.state.xIsNext ? '😭' : '😈'

  renderMessaging = () => {
    if (this.state.gameOver) {
      return <div>{this.state.winner + ' is the Winner!'}</div>
    } else {
      return <div>{'You: 😭   Computer: 😈'}</div>
    }
  }

  renderBoard = () => {
    return [0,3,6].map((value) => {
      
      return (
        <>
        <div className='row justify-content-center'>
          {this.renderSquare(value)}
          {this.renderSquare(value + 1)}
          {this.renderSquare(value + 2)}
        </div>
        </>
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
    let index = Math.floor(Math.random() * possibleMovesLeft.length)
    return possibleMovesLeft[index]
    
  }

  computerMove = (squares, player) => {
    console.log(this.state.squaresFilled)
    let computerMove = this.computerPlayer()
    squares[computerMove] = player

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
      <div className='container container-fluid'>
        <Title0>
          TicTacToe 
        </Title0>
        <Title1>
          Emojizzz
        </Title1>
        <div className='card'>
          <GameHeader className='card-header'>
              {this.renderMessaging()}
          </GameHeader>
          <BoardGame className='card-body'>
            {this.renderBoard()} 
          </BoardGame>
        </div>
        
        <Tally className='fixed-bottom'>
          <Table>
            <tr>
              <th>
                😭
              </th>
              <th>
                Tie
              </th>
              <th>
                😈
              </th>
            </tr>
            <tr>
              <td>
                {this.state.p1}
              </td>
              <td>
                {this.state.tie}
              </td>
              <td>
              {this.state.p2}
              </td>
            </tr>
          </Table>
        </Tally>
      </div>
    )
  }
}


const BoardGame = styled.div`
width: 100%;
padding: 0;
background-color: black;
`
const Tally = styled.div`
font-size: 3rem;
font-weight: bold;
display: flex;
justify-content: center;
`
const Table = styled.table`
width: 100%;
padding: 0;


`
const GameHeader = styled.div`
font-size: 3rem;
font-weight: bold;
display: flex;
justify-content: center;
`
const Title0 = styled.div`
font-size: 8rem;
font-weight: bold;
display: flex;
justify-content: center;
`
const Title1 = styled.div`
font-size: 8rem;
font-weight: bold;
display: flex;
justify-content: center;
padding-bottom: 3rem;
`
export default Board;
