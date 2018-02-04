import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import * as api from '../utils/api'
import { white, blue, black } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
  },
  deck: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderWidth: 0.5,
    borderColor: black,
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 22
  },
  subtitleText: {
    marginTop: 10,
    fontSize: 14,
    color: black
  }
});

class DeckList extends Component {

  mounted = false;

  constructor(props) {
    super(props)
    this.state = { decks: {} }
    this.renderDeck = this.renderDeck.bind(this)
  }

  componentDidMount() {
    this.mounted = true;
    api.addInitialData(api.example)
      .then(data => this.setState({decks: data}));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate() {
    if(this.mounted) {
      api.getAllDecks()
        .then(data => {
          this.setState({decks: data, refresh: false})
        })
    }
  }

  renderDeck(deck) {
    return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Deck',
            { title: deck.item.title }
          )}
        >
          <View style={styles.deck}>
            <Text style={styles.titleText}>{deck.item.title}</Text>
            <Text style={styles.subtitleText}>{`${deck.item.questions.length} cards`}</Text>
          </View>
        </TouchableOpacity>
    )
  }

  render() {
    const decks = []
    const data = this.state.decks
    for (const key in data) {
      decks.push(data[key])
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={deck => deck.title}
        />
      </View>
    )
  }
}

export default DeckList
