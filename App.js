/* @flow */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPlayer: 'X',
      box1: '',
      box2: '',
      box3: '',
      box4: '',
      box5: '',
      box6: '',
      box7: '',
      box8: '',
      box9: '',
    }

  }

  render() {
    const tapped = (i, event) => {
      if (this.state.currentPlayer === 'X') {
        this.setState({ [`box${i}`]: 'X', currentPlayer: 'O' })
      } else {
        this.setState({ [`box${i}`]: 'O', currentPlayer: 'X' })
      }
    }
    const reset = () => {
      for (let i = 1; i <= 9; i++) {
        this.setState({ [`box${i}`]: '', currentPlayer: 'X' });
      }
      Alert.alert('Board has been reset');
    }
    const createBoard = () => {
      const board = [];
      for (let i = 1; i <= 9; i++) {
        board.push(<TouchableOpacity key={i} style={styles.box} onPress={tapped.bind(this, i)}><Text style={styles.value}>{this.state[`box${i}`]}</Text></TouchableOpacity>)
      }
      return board;
    }
    return (
      <View>
        <View style={styles.container}>
          {createBoard()}
          <Button title="Reset" onPress={reset} />
          <View>
            <Text>Player {this.state.currentPlayer}'s Turn</Text>
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
