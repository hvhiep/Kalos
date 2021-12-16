import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../../constant';
import HeartButton from '../../components/HeartButton';
import StartButton from '../../components/StartButton';
import {toggleWorkoutLike, getWorkoutById} from '../../serverAPIs/favoriteAPI'

import { getWorkoutById } from '../../serverAPIs/workoutAPI';
import LoadingView from '../../components/LoadingView';
import { toMuscleGroupName } from '../../backendRules';
function WorkoutInfoScreen({navigation, route}) {

  const { workoutId } = route.params || {};

  const [liked, setLiked] = useState(workout?.liked)
  const [isLoading, setIsLoading] = useState(false)
  const [workout, setWorkout] = useState(false)

  useEffect(()=>{
    getWorkout()
  },[])

  const getWorkout = async () => {
    try{
      setIsLoading(true)
      const res = await getWorkoutById(workoutId)
      setWorkout(res?.data?.workout)
    } catch (e) {

    } finally{
      setIsLoading(false)
    }
  }

  const renderHeader = ()=>(
    <View style= {styles.banner}>
        <ImageBackground
        source={{uri: workout?.image}}
        resizeMode='cover'
        style={{flex:1, justifyContent:'space-between'}}>
          <LinearGradient 
            start={{x:0, y:0}}
            end={{x:0, y:1}}
            colors={[COLOR.BLACK, COLOR.TRANSPARENT]} 
            style={styles.topLinearGradient}>
              <HeartButton style={styles.likeBtn} isliked={liked} 
              onButtonPress={()=>{
                setLiked(like => !like) 
                toggleWorkoutLike(workout._id)
              }}/>
            </LinearGradient>
            <LinearGradient 
            start={{x:0, y:0}}
            end={{x:0, y:1}}
            colors={[COLOR.TRANSPARENT, COLOR.BLACK]} 
            style={styles.linearGradient}>
                {/* <Text style={styles.levelTxt} numberOfLines={1}>Level: {workout?.level}</Text> */}
                <Text style={styles.title} numberOfLines={2}>{workout?.name}</Text>
                <ScrollView horizontal style={styles.tagScroll}>
                  {workout?.muscleGroups &&
                    workout?.muscleGroups?.map((item, index)=>(
                      <View style={[styles.tag, index==0?{marginLeft:20}:{}]} key={index}>
                        <Text style={styles.tagTxt}>{toMuscleGroupName(item)}</Text>
                      </View>
                    ))
                  }
                </ScrollView>
                <Text style={styles.levelTxt}>Thời gian ước tính : {workout?.rounds?.length * 15} phút</Text>
                <Text style={styles.levelTxt}>Số Round : x{workout?.rounds?.length}</Text>
            </LinearGradient>
        </ImageBackground>
    </View>
)

if(isLoading) return (
  <View style={{ flex: 1, backgroundColor:COLOR.MATTE_BLACK}}>
    <LoadingView/>
  </View>
)

  return (
    <View style={{ flex: 1, backgroundColor:COLOR.BLACK}}>
        <StatusBar barStyle='light-content' translucent backgroundColor='transparent'></StatusBar>
        {renderHeader()}
        <View style={styles.btnWrapper}>
          <StartButton title='Bắt Đầu' onButtonPress={()=>navigation.navigate('WorkoutDetail', {workoutData: workout}) }></StartButton>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner:{
    height:'80%',
  },
  topLinearGradient:{
    height:120
  },
  linearGradient: {
    height:300,
    justifyContent:'flex-end',
  },
  levelTxt:{
    fontSize:15,
    color:COLOR.WHITE,
    width:'80%',
    paddingHorizontal:20,
    lineHeight:25
  },
  title:{
    fontSize:40,
    color:COLOR.WHITE,
    fontWeight:'bold',
    width:'100%',
    paddingHorizontal:20
  },
  btnWrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:60
    //backgroundColor:'#fff'
  },
  btn:{
    width:120,
    height:120,
    backgroundColor:'#fff',
    borderRadius:70,
    alignItems:'center',
    justifyContent:'center'
  }, 
  btnTxt:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  },
  tagScroll:{
    maxHeight:50,
  },
  tag:{
    height:30,
    backgroundColor:COLOR.WHITE,
    alignSelf:'center',
    justifyContent:'center',
    borderRadius:7,
    marginRight:10,
  },
  tagTxt:{
    fontSize:15,
    fontWeight:'bold',
    paddingHorizontal:15
  },
  likeBtn:{
    position:'absolute',
    right:20,
    top:30
  }
});

export default WorkoutInfoScreen;
