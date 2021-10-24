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
function ProgramItem(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress?props.onPress:()=>{}}>
            <View styles={styles.container}>
                <BackgroundImage
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImage}
                source={props.image}>
                    <LinearGradient style = {styles.linearGradient}
                    colors = {[COLOR.TRANSPARENT, COLOR.BLACK]}
                    start={{x: 1, y:0.2}}
                    end={{x: 0.3, y:0.9}}>
                        <View style={styles.tagSession}>
                            <View style={styles.levelTag}>
                                <Text style = {styles.levelText}>{props.level?props.level:"Beginner"}</Text>
                            </View>
                            <View style={styles.likeTag}>
                                <HeartButton isliked = {props.isLiked}></HeartButton>
                            </View>
                        </View>
                        <View style={styles.titleSession}>
                            <Text>CZcss</Text>
                        </View>
                    </LinearGradient>
                </BackgroundImage>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 240,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: COLOR.WHITE,
        margin: 10,
    },
    backgroundImage:{
        borderRadius: 5,
        flex: 0.75, 
        borderRadius: 5,
        flexDirection:'row-reverse',
        // height: 240
    },
    linearGradient:{
        width: "100%",
        borderRadius: 5,
        // height: "100%"
        flexDirection:'row-reverse',
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
        backgroundColor: COLOR.BLACK, 
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center'
    },
    levelText:{
        color: COLOR.WHITE,
        fontSize: 20,
    },
    titleSession:{
        flex: 2/3
    },
});
export default ProgramItem;