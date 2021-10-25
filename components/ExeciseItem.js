import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native-paper';
import {COLOR, SCREEN_WIDTH} from '../constant';


function ExeciseItem(props)
{
    return (
        <TouchableWithoutFeedback onPress={props.onPress?props.onPress:()=>{}}>
            <View style={[styles.container, props.style]}>
                <Image style={styles.img}
                    source={props.image}/>
                <View style={styles.titleSession}>
                    <Text style={styles.titleText}>{props.title}</Text>
                    <View>
                        {props.isLiked && 
                        <Icon name="heart"
                        type="font-awesome-5"
                        solid
                        color="#FF0000"
                        />}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:
    {
        height: 100,
        flexDirection: 'row',
        margin: 5,
        padding: 10,
    },
    img:{
        flex: 1/3,
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 10,
    },
    titleSession:{
        flex: 2/3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    titleText: {
        color: COLOR.WHITE,
        fontSize: 20,
        width: "80%"
    },

});
export default ExeciseItem;