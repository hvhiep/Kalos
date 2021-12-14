import React, {} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,

} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { COLOR, SCREEN_WIDTH } from '../constant';
import { TouchableHighlight } from 'react-native-gesture-handler';
export default function NotFoundItemCard(props)
{
    return(
        <View style={[styles.container,props.style]}>
            <BackgroundImage source = {props.image}
            style={styles.image}>
                <View style={styles.overlay}>
                    <Text style={styles.titleText}>{props.title}</Text>
                    <TouchableHighlight onPress={props?.onPress} style={styles.clickButton}>
                        <Text style={styles.buttonText}>{props?.buttonTitle}</Text>
                    </TouchableHighlight>
                </View>
            </BackgroundImage>
        </View>

    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 200,
        flexDirection: 'column',
        margin: 10,
        borderRadius: 20,
        elevation: 5,

    },
    image:{
        flex:1, 
        resizeMode: 'contain',
        borderRadius: 5,
        
    },
    overlay:{
        flex:1,
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        color: "#FFFFFFAE",
        fontSize: 18,
        padding: 10,
        width: SCREEN_WIDTH * .65,
        
        textAlign: 'center'
    },
    clickButton:{
        backgroundColor: COLOR.BLUE,
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 20,
    },
    buttonText:{
        color: COLOR.WHITE,
        fontSize: 16,
    }
})