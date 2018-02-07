import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import Theme from '../constants/theme';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import ConnectScreen from '../screens/ConnectScreen';
import DropZonesScreen from '../screens/DropZonesScreen';
import PackScreen from '../screens/PackScreen';
import HoodScreen from '../screens/HoodScreen';
import ReOrderScreen from '../screens/ReOrderScreen';
import DeckScreen from '../screens/DeckScreen';


import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: ConnectScreen,
    },
    OnBoarding: {
      screen: OnBoardingScreen,
    },
    Pack: {
      screen: PackScreen,
    },  
    Hood: {
      screen: HoodScreen,
    },       
    DropZones: {
      screen: DropZonesScreen,
    },  
    ReOrder: {
      screen: ReOrderScreen,
    },  
    Deck: {
      screen: DeckScreen,
    },  
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
