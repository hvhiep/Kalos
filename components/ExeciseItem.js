import React, {useState} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import {COLOR, SCREEN_WIDTH} from '../constant';


function ExeciseItem(props)
{
    const {exercise} = props
    return (
        <TouchableOpacity onPress={props.onPress?props.onPress:()=>{}}>
            <View style={[styles.container, props.style]}>
                <Image style={styles.img}
                    source={{uri: exercise?.image}}/>
                <View style={styles.titleSession}>
                    <Text style={styles.titleText}>{exercise?.name}</Text>
                    <View style={styles.heartIcon}>
                        {exercise?.liked && 
                        <Icon name="heart"
                        type="font-awesome-5"
                        solid
                        color="#FF0000"
                        />}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    img:{
        resizeMode: "center",
        height: 80,
        width: 100,
        borderRadius: 30,
    },
    titleSession:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '400',
        color: COLOR.WHITE,
        fontFamily: 'Roboto',
        maxWidth: '85%'
    },
    heartIcon:{
        minWidth: 20
    }
});
export default ExeciseItem;