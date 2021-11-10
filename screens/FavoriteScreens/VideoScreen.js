import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Video from 'react-native-video'
import {COLOR, SCREEN_WIDTH} from '../../constant'
import {Icon} from 'react-native-elements';
import HeartButton from '../../components/HeartButton';

function VideoScreen({route})
// function VideoScreen(props)
{
    var videoData = route?route.params: null;
    return (
        <View style = {styles.container}>
            <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.titleText}>Video</Text>
            </View>
            <Video
            source={{uri: videoData.videoUrl}}
            // source={{uri: props.videoUrl}}
            style = {{width: SCREEN_WIDTH, height: 300}}
            controls = {true}
            rate = {1}
            volume = {1}
            playInBackground = {false}
            // paused = {props.isPaused? false: props.isPaused}
            />
            <View style = {styles.titleContainer}>
                <Text style={[{flex: 0.75}, styles.titleText]}>Hướng dẫn hít đất dành cho người mới bắt đầu</Text>
                {/* <Icon style={{flex: 0.25}}
                name="heart"
                solid
                type="font-awesome-5"
                color={COLOR.RED}/> */}
                <HeartButton style={{flex: 0.25}}
                isliked= {true}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLOR.MATTE_BLACK,
    },
    titleContainer:{
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText:{
        color: COLOR.WHITE,
        fontSize: 23,
    },
})
export default VideoScreen;