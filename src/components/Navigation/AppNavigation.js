import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Text } from "react-native";
import LoginScreen from "../Containers/LoginScreen";
import SignupScreen from "../Containers/SignupScreen";
import ForgottenPasswordScreen from "../Containers/ForgottenPasswordScreen";

import MockFormScreen from "../MockFormScreen/index";
import ReviewScreen from "../ReviewScreen/index";
import MenuScreen from "../Containers/MenuScreen";



// -- Some new code --

const DrawerStack = DrawerNavigator({
  Menu: { screen: MenuScreen, navigationOptions: { title: "Main Menu" } },
  Forms: { screen: ReviewScreen, navigationOptions: { title: "Your forms" } },
  MockForms: { screen: MockFormScreen, navigationOptions: { title: "Mockforms" } },
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: "float",
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: "#f0f8ff" },
    headerLeft: <Text style={{ fontSize: 30, fontWeight:"bold", paddingLeft: 15 } } onPress={() => {

      if (navigation.state.index === 0) {
        navigation.navigate("DrawerOpen");
      } else {
        navigation.navigate("DrawerClose");
      }
    }}>☰</Text>
  })
});

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen, navigationOptions: { title: "Create an account" } },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: "Forgot Password" } },
  menuScreen: { screen: MenuScreen }
}, {
  headerMode: "float",
  navigationOptions: {
    headerStyle: { backgroundColor: "#f0f8ff" },
    title: "Mobile Reporting App"
  }
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: "none",
  title: "Main",
  initialRouteName: "loginStack"
});

export default PrimaryNav;

// export default MainScreenNavigator;
