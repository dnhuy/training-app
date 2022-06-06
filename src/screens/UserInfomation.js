import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const Separator = () => (
  <View style={{ marginVertical: 8, borderBottomColor: "#737373", borderBottomWidth: StyleSheet.hairlineWidth }} />
)

const UserInfomation = ({ route, navigation }) => {

  const { user } = route.params

  const handlePressLogout = () => {
    navigation.navigate("SigninGoogle")
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ width: "100%", height: 200 }}
        source={{
          uri: user?.photo
        }}
      />
      <Text style={{ fontSize: 22, fontWeight: "500", marginTop: 10 }}>{`Wellcome ${user?.name}!`}</Text>
      <Separator />
      <View>
        <Text style={{ fontSize: 20, marginBottom: 8 }}>Analytics</Text>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginHorizontal: 10 }}>
          <Button
            title="Custom Events"
            onPress={async () => {
              await analytics().logEvent("course", {
                id: 100,
                class: "SEO",
                description: ["SEO in google", "other skills"]
              })
            }}
          />
          <Button
            title="Predefined Events"
            onPress={async () => {
              await analytics().logSelectContent({
                content_type: "mskill-course",
                item_id: "111"
              })
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 8 }}>Crashlytics</Text>
        <View style={{ marginHorizontal: 8 }}>
          <Button 
            title="Test Crash"
            onPress={() => crashlytics().crash()}
          />
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, marginBottom: 20 }}>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "#a9a9a9" }}
          onPress={handlePressLogout}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "center" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserInfomation