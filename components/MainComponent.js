import React, { Component } from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import NetInfo from "@react-native-community/netinfo";
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from "./FavoriteComponent";
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Login from './LoginComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    addComment:(dishId, rating, comment, author) => dispatch(addComment(dishId, rating, comment, author)),
    postComment:(dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author)),
  }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
const MenuNavigator = createStackNavigator();

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"            
    }
};

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                    source={require('./images/logo.png')}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                iconStyle={{ paddingLeft: 15 }} 
                                name='menu'
                                size={30}
                                color='white'
                                onPress={() => 
                                    navigation.toggleDrawer()}
                            />
                        )
                    
                    })
                 }
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();


function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                iconStyle={{ paddingLeft: 15 }} 
                                name='menu'
                                size={30}
                                color='white'
                                onPress={() => 
                                    navigation.toggleDrawer()}
                            />
                        )
                    
                    })
                 }
            />
        </HomeNavigator.Navigator>
    );
}
const LoginNavigator = createStackNavigator();


function LoginNavigatorScreen() {
    return(
        <LoginNavigator.Navigator
            initialRouteName='Login'
            screenOptions={HeaderOptions}
        >
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                iconStyle={{ paddingLeft: 15 }} 
                                name='menu'
                                size={30}
                                color='white'
                                onPress={() => 
                                    navigation.toggleDrawer()}
                            />
                        )
                    
                    })
                 }
            />
        </LoginNavigator.Navigator>
    );
}
const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen(){
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact Us'
            screenOptions={HeaderOptions}
        >
            <ContactNavigator.Screen
                name="Contact Us"
                component={Contact}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                iconStyle={{ paddingLeft: 15 }} 
                                name='menu'
                                size={30}
                                color='white'
                                onPress={() => 
                                    navigation.toggleDrawer()}
                            />
                        )
                    
                    })
                 }
            />
        </ContactNavigator.Navigator>
    );
}

const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen(){
    return(
        <FavoritesNavigator.Navigator
            initialRouteName='Favorites'
            screenOptions={HeaderOptions}
        >
            <FavoritesNavigator.Screen
                name="Favorites"
                component={Favorites}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                iconStyle={{ paddingLeft: 15 }} 
                                name='menu'
                                size={30}
                                color='white'
                                onPress={() => 
                                    navigation.toggleDrawer()}
                            />
                        )
                    
                    })
                 }
            />
        </FavoritesNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen(){
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Reserve Table'
            screenOptions={HeaderOptions}
        >
            <ReservationNavigator.Screen
                name="Reservation Us"
                component={Reservation}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                iconStyle={{ paddingLeft: 15 }} 
                                name='menu'
                                size={30}
                                color='white'
                                onPress={() => 
                                    navigation.toggleDrawer()}
                            />
                        )
                    
                    })
                 }
            />
        </ReservationNavigator.Navigator>
    );
}

const AboutUsNavigator = createStackNavigator();

const MenuIcon = (props) => {
    return(
        <Icon
            iconStyle={{ paddingLeft: 15 }} 
            name='menu'
            size={30}
            color='white'
            onPress={() =>
                props.navigation.toggleDrawer()}
        />
    );
}

function AboutUsNavigatorScreen(){
    return(
        <AboutUsNavigator.Navigator
            initialRouteName='About Us'
            screenOptions={HeaderOptions}
        >
            <AboutUsNavigator.Screen
                name="About Us"
                component={About}
                options={
                    ({navigation}) => ({
                        headerLeft: () => 
                            <MenuIcon navigation={navigation}/>
                    })
                 }
            />
        </AboutUsNavigator.Navigator>

    )
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator 
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor:'#D1C4E9'
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props}/>}
        >
            <MainNavigator.Screen 
                name="Login"       
                component={LoginNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            size={30}
                            color={tintColor}
                        />
                    )
                }}

            />
            <MainNavigator.Screen 
                name="Home"       
                component={HomeNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={30}
                            color={tintColor}
                        />
                    )
                }}

            />
            <MainNavigator.Screen 
                name="Contact Us" 
                component={ContactNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}                
            />
            <MainNavigator.Screen 
                name="Reserve Table" 
                component={ReservationNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='table'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}                
            />
            <MainNavigator.Screen 
                name="Menu"       
                component={MenuNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            size={30}
                            color={tintColor}
                        />
                    )
                }}                
            />
            <MainNavigator.Screen 
                name="About Us"   
                component={AboutUsNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={30}
                            color={tintColor}
                        />
                    )
                }}                
            />
            <MainNavigator.Screen 
                name="My Favorites"   
                component={FavoritesNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='heart-o'
                            type='font-awesome'
                            size={30}
                            color={tintColor}
                        />
                    )
                }}                
            />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            ToastAndroid.show(`Connection ${state.type}`, ToastAndroid.LONG);
            console.log("Is connected?", state.isConnected);
        });
        // NetInfo.getConnectionInfo()
        //     .then((connectionInfo) => {
        //         ToastAndroid.show('Initial Network Connectivity Type: '
        //             + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
        //             ToastAndroid.LONG)
        //     });
    
        // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        // const unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type 111" , state.type);
        //     console.log("Is connected?111", state.isConnected);
        //   });
      }
    
    //   componentWillUnmount() {
    //     NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    //   }
    
    //   handleConnectivityChange = (connectionInfo) => {
    //     switch (connectionInfo.type) {
    //       case 'none':
    //         ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
    //         break;
    //       case 'wifi':
    //         ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
    //         break;
    //       case 'cellular':
    //         ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
    //         break;
    //       case 'unknown':
    //         ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
    //         break;
    //       default:
    //         break;
    //     }
    //   }
  render() {
 
    return(
        <NavigationContainer>
            <MainNavigatorDrawer/>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);