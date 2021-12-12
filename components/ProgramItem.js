import moment from 'moment';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../constant';

function ProgramItem(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        <ImageBackground
          source={props.image}
          style={styles.img}
          imageStyle={{borderRadius:15, backgroundColor:COLOR.BLACK, opacity:0.7}}
          resizeMode="cover">
            <Text style={{color:COLOR.WHITE, fontSize:14, fontWeight:'bold'}}>{moment(props?.updatedAt).format('LL')}</Text>
          </ImageBackground>
        {/* <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={[COLOR.TRANSPARENT, COLOR.BLACK]}
          style={styles.linearGradient}></LinearGradient> */}
        <View style={{marginVertical: 5, width:'80%'}}>
          <Text numberOfLines={3} style={styles.title}>{props.title}</Text>
        </View>
        <View style={[styles.tag, props?.tagColor && {backgroundColor:props.tagColor}]}>
          <Icon
          type='font-awesome-5'
          name={props?.icon || 'play'}
          size={12}
          color={props?.iconColor || COLOR.WHITE}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#000',
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
    color: COLOR.WHITE,
    position: 'absolute',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    top: 5,
  },
  img: {
    flex: 0.65,
    borderRadius: 15,
    paddingHorizontal:20,
    paddingTop:10
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tag: {
    position: 'absolute',
    backgroundColor: '#ff6666',
    borderRadius: 10,
    bottom: '30%',
    right: 5,
    width:30,
    height:30,
    alignItems:'center',
    justifyContent:'center'
  },
  tagTxt: {
    color: COLOR.BLACK,
    fontWeight: 'bold',
  },
});

export default ProgramItem;
