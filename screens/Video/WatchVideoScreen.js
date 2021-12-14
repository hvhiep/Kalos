import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLOR} from '../../constant';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from 'moment';
import HeartButton from '../../components/HeartButton';
// import { getVideoById } from '../../serverAPIs/videoAPI';
import { getVideoById, toggleVideoLike } from '../../serverAPIs/favoriteAPI'

function WatchVideoScreen({route}, props) {
  const {videoData} = route.params;

  const [video, setVideo] = useState({})
  const [isLiked, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  useEffect(()=>{
    getVideoDetail()
    console.log("video screen ====== ", video)
    // setLikeCount(video.likes)
    // setLike(video.liked)
    console.log("isliek ===",isLiked);
    console.log("lise count ===",likeCount)
  }, [])

  const getVideoDetail = async () => {
    // const res = await getVideoById(videoData?._id)
    // console.log("responde data===", res.data);
    // if (res) {
    //   setVideo(res?.data?.video)
    //   setLike(res?.data?.video?.liked)
    //   setLikeCount(res?.data?.video?.likes)
    getVideoById(videoData?._id, (data)=>{
      setVideo(data)
      setLikeCount(data?.likes)
      setLike(data?.liked)
    })
    }
  // };

  function youtube_parser(url) {
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
          <HeartButton heartStyle={{width:50, height:50}} isliked={isLiked} onButtonPress={()=>{
            toggleVideoLike(video._id)
            setLikeCount(prev => isLiked? prev-1: prev+1)
            setLike(prev => !prev)          
          }}/>
          <Text style={styles.desTxt}>{likeCount || 0}</Text>
      </View>

      <View style={{marginTop:30}}>
        <YoutubePlayer
          height={300}
          play={true}
          videoId={youtube_parser(video?.videoUrl || '')}
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
