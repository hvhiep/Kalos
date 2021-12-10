import React, {useState, useRef} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Video from 'react-native-video'
import {COLOR, SCREEN_WIDTH} from '../../constant'
import {Icon} from 'react-native-elements';
import HeartButton from '../../components/HeartButton';

import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function VideoScreen({route})
// function VideoScreen(props)
{
    var videoData = route?route.params: null;
    const playerRef = useRef()
    return (
        <View style = {styles.container}>
            <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.titleText}>Video</Text>
            </View>
            {/* <Video
            source={{uri: videoData.videoUrl}}
            // source={{uri: props.videoUrl}}
            style = {{width: SCREEN_WIDTH, height: 300}}
            controls = {true}
            rate = {1}
            volume = {1}
            playInBackground = {false}
            // paused = {props.isPaused? false: props.isPaused}
            /> */}

            <YoutubePlayer
            ref={playerRef}
            height={230}
            width={SCREEN_WIDTH}
            videoId={youtube_parser(videoData.videoUrl)}
            />

            <View style = {styles.titleContainer}>
                <Text style={[{flex: 0.75}, styles.titleText]}>{videoData.title}</Text>
                
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