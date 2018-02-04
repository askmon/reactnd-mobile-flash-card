import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { white, blue, black } from '../utils/colors'

class NewQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: '',
      title: this.props.navigation.state.params.title
    }
    this.addNewQuestion = this.addNewQuestion.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
  }

  static navigationOptions = {
    title: 'Add Question'
  }

  addNewQuestion(value) {
    this.setState({question: value})
  }

  addNewAnswer(value) {
    this.setState({answer: value})
  }

  submitQuestion(title, question, answer) {
    if (!question || question === '' ||
      !answer || answer === '') {
      return
    }

    const reset = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Deck',
          params: {title: title, refresh: true}
        })
      ]
    })

    api.addNewQuestion(title, question, answer)
      .then(() => {
        this.props.navigation.dispatch(reset)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <TextInput
          style={styles.inputBox}
          placeholder="Question"
          name="question"
          type="text"
          value={this.state.question}
          onChangeText={text => this.addNewQuestion(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Answer"
          name="answer"
          type="text"
          value={this.state.answer}
          onChangeText={text => this.addNewAnswer(text)}
        />
        <TouchableOpacity onPress={() => this.submitQuestion(this.state.title, this.state.question, this.state.answer)}>
          <View style={styles.button}>
            <Text style={{color: white}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    alignItems: 'center',
  },
  inputBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: black,
    padding: 10,
    width: 280,
    height: 50,
    marginTop: 25
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: black,
    width: 150,
    height: 40,
    marginTop: 30
  }
});

export default NewQuestion