import React from 'react'
import { AsyncStorage } from 'react-native'

export function addInitialData(data) {
  return AsyncStorage.setItem('decks', JSON.stringify(data))
    .then(() => {
      return getAllDecks()
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
      if (!data[title]) {
        return
      }
      return data[title]
    })
    .catch((err) => {
      return err
    })
}