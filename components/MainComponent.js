import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from "./HomeComponent";
import Contact from "./ContactComponent"
import About from "./AboutComponent"

//Updated using new react router https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/75qZq1FlQ0GamatRZQNB0Q
const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

//Updated using new react router https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/75qZq1FlQ0GamatRZQNB0Q

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
  return(
      <HomeNavigator.Navigator
          initialRouteName='Home'
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <HomeNavigator.Screen
              name="Home"
              component={Home}
          />         
      </HomeNavigator.Navigator>
  );
}
const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ navigation }) {
  return(
      <ContactNavigator.Navigator
          initialRouteName='Contact'
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <ContactNavigator.Screen
              name="Contact"
              component={Contact}
          />         
      </ContactNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ navigation }) {
  return(
      <AboutNavigator.Navigator
          initialRouteName='About'
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <AboutNavigator.Screen
              name="About Us"
              component={About}
          />         
      </AboutNavigator.Navigator>
  );
}
const Drawer = createDrawerNavigator();

function MainNavigator({ navigation }) {
    return(

        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeNavigatorScreen} />
          <Drawer.Screen name="Menu" component={MenuNavigatorScreen} />
          <Drawer.Screen name="Contact" component={ContactNavigatorScreen} />
          <Drawer.Screen name="About Us" component={AboutNavigatorScreen} />
        </Drawer.Navigator>

    );
}
  
class Main extends Component {

  render() {
 
    return (
      <NavigationContainer>   
        <MainNavigator />
      </NavigationContainer>
    );
  }
}
export default Main;