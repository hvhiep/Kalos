import React, {} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,

} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { COLOR } from '../constant';
export default function ImageOverlayCard(props)
{
    return(
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[styles.container,props.style]}>
            <BackgroundImage source = {props.image}
            style={styles.image}>
                <View style={styles.overlay}>
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
            </BackgroundImage>
        </View>
    </TouchableWithoutFeedback>

    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 150,
        flexDirection: 'column',
        margin: 10,
        borderRadius: 10,
        elevation: 5,

    },
    image:{
        flex:1, 
        resizeMode: 'contain',
        borderRadius: 5,
        
    },
    overlay:{
        flex:1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        color: COLOR.WHITE,
        fontSize: 25,
        textTransform: 'uppercase'
    }
})