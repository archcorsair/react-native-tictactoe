/* @flow */

import React from 'react'
import {
  Container, Button, Toast, Text as NText,
  Header, Left, Right, Body,
  Title, Card, CardItem, Content,
} from 'native-base'
import {
  StyleSheet, Text, View,
  TouchableOpacity, Alert,
  Vibration,
} from 'react-native'

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPlayer: 'X',
      x: [],
      o: [],
    }
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
    this.resetBoard = this.resetBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
    this.checkWinner = this.checkWinner.bind(this)
    this.displayToast = this.displayToast.bind(this)
  }
  renderBoard() {
    const board = []
    for (let i = 1; i <= 9; i++) {
      board.push(
        <TouchableOpacity key={i} style={styles.box} onPress={this.tapped.bind(this, i)}>
        <Text style={styles.value}>
          {this.state.x.includes(i) ? 'x' : (this.state.o.includes(i) ? 'o' : null)}
        </Text>
      </TouchableOpacity>
      )
    }
    return board
  }

  updateBoard(i, player) {
    if (i <= 3) {
      return this.board[0][i - 1] = player
    }
    if (i <= 6) {
      return this.board[1][i - 4] = player
    }
    if (i <= 9) {
      return this.board[2][i - 7] = player
    }
  }

  checkWinner(player) {
    const b = this.board
    // Check diags
    const diag1 = [b[0][0], b[1][1], b[2][2]]
    const diag2 = [b[0][2], b[1][1], b[2][0]]
    const winner = diag1.filter(value => value === player).length === 3 || diag2.filter(value => value === player).length === 3
    if (winner) {
      return this.resetBoard(player)
    }
    // Check rows
    for (let i = 0; i < 3; i++) {
      const winner = b[i].filter(value => value === player).length === 3
      if (winner) return this.resetBoard(player)
    }
    // Check columns
    const cols = [
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
    ]
    cols.map((col) => {
      const winner = col.filter(value => value === player).length === 3
      if (winner) return this.resetBoard(player)
    })

  }

  tapped(i, event) {
    const player = this.state.currentPlayer;
    if (this.state.x.includes(i) || this.state.o.includes(i)) return
    if (this.state.currentPlayer === 'X') {
      const x = this.state.x
      x.push(i)
      this.setState({ x: x, currentPlayer: 'O' })
    } else {
      const o = this.state.o
      o.push(i)
      this.setState({ o: o, currentPlayer: 'X' })
    }
    this.updateBoard(i, player)
    this.checkWinner(player)
    if (this.state.x.length + this.state.o.length >= 9) return this.resetBoard(1)
  }
  resetBoard(player) {
    if (this.state.x.length + this.state.o.length === 0) return
    if (typeof player === 'object') {
      this.displayToast(0)
      setTimeout(() => {
        this.setState({ x: [], o: [], currentPlayer: "X" })
      }, 1000)
    }
    if (typeof player === 'number') {
      this.displayToast(player)
      setTimeout(() => {
        this.setState({ x: [], o: [], currentPlayer: "X" })
      }, 2500)
    }
    if (typeof player === 'string') {
      this.displayToast(player)
    }
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
  }

  displayToast(player) {
    if (player === 1) {
      Vibration.vibrate()
      return Toast.show({
        text: 'Game over!',
        position: 'bottom',
        buttonText: 'Okay',
        type: 'danger',
        duration: 2500,
      })
    }
    if (player === 0) {
      return Toast.show({
        text: 'Starting new game',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 1000,
        type: 'success',
      })
    }
    if (player) {
      Vibration.vibrate()
      return Toast.show({
        text: `Player ${player} wins!`,
        position: 'bottom',
        buttonText: 'Okay',
        type: 'success',
      })
    }
  }

  render() {
    return (
        <Container>
          <Header>
            <Left/>
            <Body>
              <Title>{`Player's Turn: ${this.state.currentPlayer}`}</Title>
            </Body>
            <Right />
          </Header>
            <View style={styles.container}>
              {this.renderBoard()}
              {
                this.state.x.length + this.state.o.length > 0 &&
                <Button bordered large onPress={this.resetBoard}><NText>New Game</NText></Button>
              }
            </View>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexBasis: '30%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    display: 'inline-block',
    flexGrow: 1,
    height: '50%',
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 50,
  },
})
