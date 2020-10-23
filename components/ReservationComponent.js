import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Text, View, StyleSheet, Picker, Switch, Button, Modal, ScrollView, Alert, Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    componentDidMount() {
        //OBTAIN CALENDAR PERMISSION
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
              const calendars = await Calendar.getCalendarsAsync();
              console.log('Here are all your calendars:');
              console.log({ calendars });
            }
          })();
    }
    handleReservation() {
        let date = new Date(this.state.date);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        var time = date.toLocaleTimeString();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let dd = year + '-' + month + '-'+ dt
        Alert.alert(
            'Reserve table?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate: ' + dd + '\nTime: ' + time,
            [
                {
                    text: 'Cancel', 
                    onPress: () => this.resetForm(), 
                    style: 'cancel'
                },
                {
                    text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm()
                    }
                },
            ],
            { cancelable: true }
        );
    }
    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        console.log(defaultCalendars[0].source)
        return defaultCalendars[0].source;
    }
    async addReservationToCalendar(date) {
        let dateInMilliseconds = Date.parse(date);
        let startDate = new Date(dateInMilliseconds);
        let endDate = new Date(dateInMilliseconds + 2 * 60 * 60 * 1000);

        // const newCalendar = await Calendar.createEventAsync(Calendar.DEFAULT, {

        const newCalendar = await Calendar.createEventAsync(getDefaultCalendarSource(), {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
        
        
    render() {
        let date = new Date(this.state.date);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        var time = date.toLocaleTimeString();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let dd = year+'-' + month + '-'+dt
        return(
            <ScrollView>
                <Animatable.View animation = "zoomIn" duration = {1000} delay = {1000}>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys. 
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View style = {styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Date: {dd}</Text>
                            <Text style = {styles.modalText}>Time: {time}</Text>

                            
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                                />
                        </View>
                    </Modal>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;