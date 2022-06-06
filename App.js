import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninGoogle from './src/screens/SigninGoogle';
import UserInfomation from './src/screens/UserInfomation';
import crashlytics from '@react-native-firebase/crashlytics';
import { AppRegistry, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({})

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
})

const Stack = createNativeStackNavigator()

const App = () => {

  useEffect(() => {
    crashlytics().log('App mounted.')

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })
    return unsubscribe
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SigninGoogle"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SigninGoogle" component={SigninGoogle} />
        <Stack.Screen name="UserInfomation" component={UserInfomation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

AppRegistry.registerComponent('app', () => App)

export default App
