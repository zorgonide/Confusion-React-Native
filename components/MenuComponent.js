import React from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

function Menu(props) {

    // const renderMenuItem = ({item, index}) => {
    //     return (
    //         <ListItem key={index} bottomDivider >
    //             <View style={styles.subtitleView}>
    //                 <Image source={require('./images/uthappizza.png')} />
    //                 <Text style={styles.ratingText}>5 months ago</Text>
    //             </View>
    //             <ListItem.Content>
    //             <ListItem.Title>{item.name}</ListItem.Title>
    //             <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                
    //             </ListItem.Content>
    //         </ListItem>
    //     );
    // };
    const renderMenuItem = ({item, index}) => {

        return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                  />
        );
    };
    const styles = StyleSheet.create({
        ratingImage: {
          height: 19.21,
          width: 100
        },
    })

    return (
            <FlatList 
                data={props.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
    );
}


export default Menu;