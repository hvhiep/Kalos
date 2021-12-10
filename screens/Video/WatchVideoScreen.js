import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLOR} from '../../constant';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from 'moment';
import HeartButton from '../../components/HeartButton';

function WatchVideoScreen({route}, props) {
  const {video} = route.params;

  const getYoutubeId = url => {
    const arr = url.split('https://www.youtube.com/watch?');
    return arr[1];
  };
  function youtube_parser(url) {
    console.log(url);
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return (
    <View style={styles.container}>
      <View
        style={{paddingHorizontal: 20, marginTop:80}}>
        <Text style={styles.titleTxt}>{video?.name}</Text>
        <Text style={styles.desTxt}>{moment(video?.updatedAt).format('LL')}</Text>
      </View>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:20, justifyContent:'flex-end', marginTop:10}}>
          <HeartButton heartStyle={{width:50, height:50}} isliked={false}/>
          <Text style={styles.desTxt}>{video?.likes || 0}</Text>
      </View>

      <View style={{marginTop:30}}>
        <YoutubePlayer
          height={300}
          play={true}
          videoId={youtube_parser(video?.videoUrl)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MATTE_BLACK,
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 30,
  },
  desTxt:{
    color: COLOR.WHITE,
    fontSize: 17,

  }
});

export default WatchVideoScreen;
