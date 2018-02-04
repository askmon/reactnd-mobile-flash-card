import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import DeckList from './components/deck-list'
import Deck from './components/deck'
import NewDeck from './components/new-deck'
import NewQuestion from './components/new-question'
import Quiz from './components/quiz'
import { setLocalNotification } from './utils/helpers'
import { purple, white, black } from './utils/colors'

const Tabs = TabNavigator({
  List: {
    screen: DeckList,
    navigationOption: {
      title: 'Deck List'
    }
  },
  New: {
    screen: NewDeck,
    navigationOption: {
      title: 'Add Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  NewQuestion: {
    screen: NewQuestion
  },
  Quiz: {
    screen: Quiz
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Constants.statusBarHeight, backgroundColor: black}}>
          <StatusBar translucent backgroundColor={black} barStyle="light-content"/>
        </View>
        <MainNavigator />
      </View>
    );
  }
}
