/* @flow */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPlayer: 'X',
      x: [],
      o: [],
    }
  }

  render() {
    const tapped = (i, event) => {
      if (this.state.currentPlayer === 'X') {
        x = this.state.x
        x.push(i)
        this.setState({ x: x, currentPlayer: 'O' })
      } else {
        o = this.state.o
        o.push(i)
        this.setState({ o: o, currentPlayer: 'X' })
      }
    }
    const reset = () => {
      this.setState({ x: [], o: [], currentPlayer: "X" })
      Alert.alert('Board has been reset');
    }
    const createBoard = () => {
      const board = [];
      for (let i = 1; i <= 9; i++) {
        board.push(<TouchableOpacity key={i} style={styles.box} onPress={tapped.bind(this, i)}><Text style={styles.value}>{this.state.x.includes(i) ? 'x' : (this.state.o.includes(i) ? 'o' : null)}</Text></TouchableOpacity>)
      }
      return board;
    }
    return (
      <View>
        <View style={styles.container}>
          {createBoard()}
          <Button title="Reset" onPress={reset} />
          <View>
            <Text>Player Turn: {this.state.currentPlayer}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
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
    fontWeight: '900',
  },
});
