import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView
} from 'react-native';
import { toLevelName } from '../backendRules';
import {COLOR} from '../constant';
import HeartButton from './HeartButton';

function WorkoutRowItem(props) {

  return (
    <TouchableWithoutFeedback
      onPress={props.onPress ? props.onPress : () => {}}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={[props?.imageStyle, styles.image]}
          source={props?.image}
          resizeMode="cover">
          {props?.createdTime && <Text style={styles.desTxt}>{props?.createdTime}</Text>}
          {props?.level && <Text style={styles.desTxt}>Level: {toLevelName(props?.level)}</Text>}
          <Text style={styles.titleTxt}>{props?.title}</Text>
          <ScrollView horizontal style={styles.tagScroll} showsHorizontalScrollIndicator={false}>
            {props?.muscleGroups &&
              props?.muscleGroups?.map((item, index) => (
                <View
                  style={[styles.tag, index == 0 ? {marginLeft: 10} : {}]}
                  key={index}>
                  <Text style={styles.tagTxt}>{item}</Text>
                </View>
              ))}
          </ScrollView>
            {/* <HeartButton style={styles.likeBtn} heartStyle={{width:60, height:60}} isliked={props?.isliked} onButtonPress={()=>{}}/> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 5,
    elevation: 5,
  },
  image: {
    borderRadius: 5,
    backgroundColor: COLOR.MATTE_BLACK,
    opacity: 0.6,
  },
  imageBackground: {
    flex: 1,
    paddingTop: 15,
  },
  desTxt: {
    color: COLOR.WHITE,
    fontSize: 13,
    fontWeight: '400',
    marginHorizontal:15
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal:15
  },

  tagScroll: {
    maxHeight: 40,
    marginTop:5
  },
  tag: {
    height: 25,
    backgroundColor: COLOR.BLACK,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  tagTxt: {
    fontSize: 15,
    fontWeight: '900',
    paddingHorizontal: 15,
    color:COLOR.WHITE
  },
  likeBtn:{
    position:'absolute',
    right:0,
    top:0
  }
});

export default WorkoutRowItem;
