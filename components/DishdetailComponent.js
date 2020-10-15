import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import {  AirbnbRating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, addComment, postComment } from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment:(dishId, rating, comment, author) =>dispatch(addComment(dishId, rating, comment, author)),
    postComment:(dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
})
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        let date = new Date(item.date);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let dd = year+'-' + month + '-'+dt
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + dd } </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#EBCB8B'
                            onPress={() => props.onSelect()}
                        />
                    </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            rating: 3,
            comment: "",
            author:"",
            modal: false
        };
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    toggleModal() {
        this.setState({modal: !this.state.modal})
    }

    handleComments(dishId) {
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
      }
    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onSelect = {() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.modal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <Text style = {styles.modalTitle}>Add Comment</Text>
                    <View >
                        {/* <AirbnbRating
                            onFinishRating={(rating) =>{
                                this.setState({rating: rating});
                        }} /> */}
                        <AirbnbRating
                            count={5}
                            reviews={["Bad", "Meh", "OK", "Good", "Excellent"]}
                            defaultRating={3}
                            size={50}
                            onFinishRating={(rating) =>{
                                this.setState({rating: rating});}}
                        />
                    </View>
                    <View >
                        <Input
                        placeholder=' Author'
                        leftIcon={
                            <Icon
                            name='user-o'
                            type = 'font-awesome'
                            size={24}
                            />
                        }
                        onChangeText = {(value) => this.setState({author: value})}
                        />
                    </View>
                    <View style={styles.formElement}>
                        <Input
                            placeholder = " Comment"
                            leftIcon = {
                                <Icon
                                name = 'comment-o'
                                type = 'font-awesome'
                                size = {24}
                                />
                            }
                            onChangeText = {(value) => this.setState({comment: value})}
                        />
                    </View>
                    <View style={styles.inputForm}>
                        <Button color = "white"
                            title = " Submit"
                            onPress = {() => this.handleComments(dishId)}
                            icon={
                                <Icon
                                    color="white"
                                    name='american-sign-language-interpreting'
                                    type='font-awesome'
                                />
                            }
                            />
                    </View>
                    <View style={styles.inputForm}>
                        <Button onPress = {() => this.toggleModal()}
                            color="red"
                            icon={
                                <Icon
                                    color="white"
                                    name='trash'
                                    type='font-awesome'
                                />
                            }
                            title=" Cancel"
                            />
                    </View> 
                </Modal>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 10
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
     inputForm: {
        margin: 20
     },
     formElement: {
         marginTop: 20
     }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);