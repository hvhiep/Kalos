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
function VideoItem(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress?props.onPress:()=>{}}>
            <View style={styles.container}>
                <BackgroundImage
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImage}
                source={props.image}>
                    <LinearGradient style = {styles.linearGradient}
                    colors = {["#00000033","#00000080", "#000000B3"]}
                    // start={{x: 1, y:0.2}}
                    // end={{x: 0.3, y:0.9}}
                    >
                        <View style={styles.tagSession}>
                            <View style={styles.levelTag}>
                                <Text style = {styles.levelText}>Video</Text>
                            </View>
                            <View>
                                {/* <HeartButton isliked = {props.isLiked}></HeartButton> */}
                                <Icon name='heart'
                                type='font-awesome-5'
                                solid={props.isLiked?props.isLiked:false}
                                color = {props.isLiked?"#FF0000":"#FFF"}
                                size = {25}></Icon>
                            </View>
                        </View>
                        <View style={styles.titleSession}>
                            <Text style = {styles.timeText}>Hướng dẫn</Text>
                            <Text style = {styles.titleText}>Luyện tập để có 6 múi</Text>
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
        paddingHorizontal: 18,
        paddingVertical: 18
    },
    tagSession:{
        flex: 1/3, 
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    levelTag:{
        backgroundColor: "#000", 
        paddingHorizontal: 13,
        paddingVertical: 5,
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
    },
    timeText: {
        textTransform: 'uppercase',
        fontWeight: 'normal',
        color: COLOR.WHITE,
        fontSize: 18,
    },
    titleText: {
        color: COLOR.WHITE,
        fontSize: 24,
    }
});
export default VideoItem;