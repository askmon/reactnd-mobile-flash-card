import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as api from '../utils/api'
import { white, blue, black } from '../utils/colors'

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: 0,
      refreshState: false
    }
  }

  static navigationOptions = ({ navigation }) => (
    {
      title: 'Deck',
      headerLeft: navigation.state.params.refresh &&
        <Ionicons
          onPress={() => navigation.navigate('Home')}
          style={{marginLeft: 13}}
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
        />,
    }
  )

  componentDidMount() {
    api.getDeck(this.props.navigation.state.params.title)
      .then((data) => {
        if(data) {
          this.setState({cards: data.questions.length})
        }
      }).catch(err => console.error(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfView}>
          <Text style={styles.titleText}>{this.props.navigation.state.params.title}</Text>
          <Text style={styles.subtitleText}>{`${this.state.cards} cards`}</Text>
        </View>

        <View style={styles.halfView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'Quiz',
              { title: this.props.navigation.state.params.title }
            )}
          >
            <View style={styles.button}>
              <Text>Start a Quiz</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'NewQuestion',
              { title: this.props.navigation.state.params.title }
            )}
          >
            <View style={[styles.button, {backgroundColor: black}]}>
              <Text style={{color: white}}>Create New Question</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  halfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30
  },
  subtitleText: {
    marginTop: 10,
    fontSize: 20,
    color: blue
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: black,
    width: 150,
    height: 40,
    marginBottom: 10
  }
});

export default Deck