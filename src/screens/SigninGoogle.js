import React from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import crashlytics from '@react-native-firebase/crashlytics';

const SigninGoogle = ({ navigation }) => {
  
  const handlePressSigninGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const token = await GoogleSignin.getTokens()
      console.log("token", token)
      if (token && token?.accessToken && userInfo && userInfo?.user) {
        crashlytics().log('User signed in.')
        await Promise.all([
          crashlytics().setUserId(userInfo.user.id),
          crashlytics().setAttributes({
            email: userInfo.user.email,
            username: userInfo.user.name
          })
        ])
        navigation.navigate("UserInfomation", { user: userInfo.user })
      }
    } catch (error) {
      crashlytics().recordError(error)
      console.log("error", error.message)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handlePressSigninGoogle}
      />
    </View>
  )
}

export default SigninGoogle
