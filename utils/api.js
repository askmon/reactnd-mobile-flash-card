import React from 'react'
import { AsyncStorage } from 'react-native'

export const example = {
    title: 'Example Deck To Get Started',
    questions: [
      {
        question: 'This is a question',
        answer: 'This is an answer'
      }
    ]
}

export function addInitialData() {
  return getAllDecks()
    .then(payload => {
      return AsyncStorage.setItem('decks',
        JSON.stringify(Object.assign({}, payload, {
            [example.title]: {
              questions: example.questions,
              title: example.title
            }
          })
        )
      )
    })
}

export function addNewDeck(title) {
  return getAllDecks()
    .then(payload => {
      return AsyncStorage.setItem('decks',
        JSON.stringify(Object.assign({}, payload, {
            [title]: {
              questions: [],
              title: title
            }
          })
        )
      )
    })
}

export function addNewQuestion(title, question, answer) {
  return getAllDecks()
    .then(payload => {
      payload[title].questions.push({
        question: question,
        answer: answer
      })
      return AsyncStorage.setItem('decks',
        JSON.stringify(payload)
      )
    })
}

export function removeAllDecks() {
  return AsyncStorage.removeItem('decks')
}

export function getAllDecks() {
  return AsyncStorage.getItem('decks')
    .then((payload) => {
      if (!payload) {
        return
      }
      return JSON.parse(payload)
    })
    .catch((err) => {
      return err
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem('decks')
    .then((payload) => {
      if (!payload) {
        return
      }
      const data = JSON.parse(payload)
      console.log(data)
      if (!data[title]) {
        return
      }
      return data[title]
    })
    .catch((err) => {
      return err
    })
}