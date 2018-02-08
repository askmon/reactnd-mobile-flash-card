import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'
import FlipCard from 'react-native-flip-card'
import { white, blue, black, orange, purple, gray, red } from '../utils/colors'
import { clearLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFinalScore: false,
      questionIndex: 0,
      score: 0,
      totalScore: 0,
      questions: [{
        question: '',
        answer: ''
      }]
    }
  }

  static navigationOptions = {
    title: 'Time to check your answers'
  }

  componentDidMount() {
    this.props.navigation.state.params.title && (
      api.getDeck(this.props.navigation.state.params.title)
        .then(data => {
          if (data.questions.length === 0) {
            data = this.state.questions
          }
          this.setState({
            questions: data.questions,
            totalScore: data.questions.length
          })
          return
        })
        .catch(err => err)
      )
  }

  render() {
    const mainView = (
        <View>
          <Text>Tap the card to show the correct answer!</Text>
          <FlipCard
            style={{maxHeight: 200, width: 280, borderWidth: 0}}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
          >
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: orange}}>
              <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].question}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: purple}}>
              <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].answer}</Text>
            </View>
          </FlipCard>
        </View>
      )

    return this.state.showFinalScore
      ? (
          <View style={styles.container}>
            <Text style={{fontSize: 40, color: black, padding: 30, textAlign: 'center'}}>
              {`You've got ${this.state.score}/${this.state.totalScore} correct!`}
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={[styles.button, {backgroundColor: black}]}>
                <Text style={{color: white}}>Back to Deck</Text>
              </View>
            </TouchableOpacity><TouchableOpacity onPress={() => {
              this.setState({ showFinalScore: false, questionIndex: 0, score: 0 })
            }}>
              <View style={[styles.button, {backgroundColor: black}]}>
                <Text style={{color: white}}>Restart Quiz</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      : (
          <View style={styles.container}>
            <Text style={{height: 20, marginTop: 15}}>{`${this.state.questionIndex}/${this.state.totalScore}`}</Text>
            <View style={[styles.halfView, {flex: 2}]}>
              {mainView}
            </View>

            <View style={styles.halfView}>
              <TouchableOpacity
                disabled={this.state.totalScore === 0 ? true : false}
                onPress={() => {
                  if(this.state.questionIndex + 1 === this.state.totalScore) {
                    clearLocalNotification()
                  }
                  this.setState((state) => {
                    return (state.questionIndex + 1 === state.totalScore)
                    ? {score: state.score + 1, showFinalScore: true}
                    : {score: state.score + 1, questionIndex: state.questionIndex + 1}
                  })
                }}
              >
                <View style={[styles.button, {backgroundColor: blue}]}>
                  <Text style={{color: black}}>Correct</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={this.state.totalScore === 0 ? true : false}
                onPress={() => {
                  this.setState((state) => {
                    return (state.questionIndex + 1 === state.totalScore)
                    ? {showFinalScore: true}
                    : {questionIndex: state.questionIndex + 1}
                  })
                }}
              >
                <View style={[styles.button, {backgroundColor: red}]}>
                  <Text style={{color: black}}>Wrong</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
  },
  halfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 23,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    color: black
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

export default Quiz