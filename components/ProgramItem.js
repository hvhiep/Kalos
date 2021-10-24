import React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BackgroundImage } from 'react-native-elements/dist/config';
import {COLOR, SCREEN_WIDTH} from '../constant';
import HeartButton from './HeartButton';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native-paper';
function ProgramItem(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress?props.onPress:()=>{}}>
            <View style={styles.container}>
                <BackgroundImage
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImage}
                source={props.image}>
                    <LinearGradient style = {styles.linearGradient}
                    colors = {[COLOR.TRANSPARENT, COLOR.BLACK]}
                    // start={{x: 1, y:0.2}}
                    // end={{x: 0.3, y:0.9}}
                    >
                        <View style={styles.tagSession}>
                            <View style={styles.levelTag}>
                                <Text style = {styles.levelText}>{props.level?props.level:"Beginner"}</Text>
                            </View>
                            <View>
                                {/* <HeartButton isliked = {props.isLiked}></HeartButton> */}
                                <Icon name='heart'
                                type='font-awesome-5'
                                solid={props.isLiked?props.isLiked:false}
                                color = {props.isLiked?"#FF0000":"#000"}></Icon>
                            </View>
                        </View>
                        <View style={styles.titleSession}>
                            <Text style = {styles.typeText}>CZcss</Text>
                            <Text style = {styles.titleText}>XyZ</Text>
                        </View>
                    </LinearGradient>
                </BackgroundImage>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 220,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: COLOR.WHITE,
        margin: 10,
    },
    backgroundImage:{
        borderRadius: 5,
        flex: 1, 
        borderRadius: 5,
        flexDirection:'row',
    },
    linearGradient:{
        width: "100%",
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    tagSession:{
        height: 25,
        flex: 1/3, 
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    levelTag:{
        backgroundColor: "#262626FF", 
        padding: 13,
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
        
    },
    levelText:{
        color: COLOR.WHITE,
        fontSize: 20,
    },
    titleSession:{
        flex: 2/3,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    typeText: {
        color: COLOR.WHITE,
        fontSize: 18,
    },
    titleText: {
        color: COLOR.WHITE,
        fontSize: 20,
    }
});
export default ProgramItem;