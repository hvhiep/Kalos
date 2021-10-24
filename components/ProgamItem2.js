import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
  } from 'react-native';
import {COLOR} from '../constant'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';

function ProgramItem2(props) {

    // const defaultPfp='https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA='

    return (
      <TouchableWithoutFeedback onPress={props.onPress?props.onPress:()=>{}}>
        <View style={styles.container}>
          <BackgroundImage
          style={styles.img}
          imageStyle={styles.img}
          source={props.image}
          >
            {/* <LinearGradient 
            start={{x:1, y:0.2}}
            end={{x:0.3, y:0.9}}
            colors={[COLOR.BLACK, COLOR.TRANSPARENT]} 
            style={styles.linearGradient}>
                <View style={{width:'40%',}}>
                    <View style={styles.tag}>
                        <Icon
                        name='dumbbell'
                        type='font-awesome-5'
                        size={12}
                        color={COLOR.WHITE}/>
                        <Text style={styles.tagTxt}>Set: x4</Text>
                    </View>
                    <View style={styles.tag}>
                        <Icon
                        name='clock'
                        type='font-awesome-5'
                        size={12}
                        color={COLOR.WHITE}/>
                        <Text style={styles.tagTxt}>Thời gian: 1.5 giờ</Text>
                    </View>
                </View>
            </LinearGradient> */}
          </BackgroundImage>
          {/* <View style={styles.infoWrapper}>
            <Text numberOfLines={1} style={styles.titleTxt}>Xây dựng cơ ngực với chống đẩy</Text>
            <Text numberOfLines={1} >Nhóm cơ tác động: Ngực, Vai, Lưng, Xô</Text>
          </View> */}
          
        {/* <View style={styles.level}>
            <Text style={styles.levelTxt}>Người mới tập</Text>
        </View> */}
        </View>
    </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
        height:240,
        borderRadius:5,
        elevation:5,
        backgroundColor:COLOR.WHITE,
        margin:10
    },
    img:{
        flex:1,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flexDirection:'row-reverse'
    },
    infoWrapper:{
        backgroundColor:COLOR.WHITE,
        flex:0.25,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        paddingHorizontal:10,
        paddingTop:5
        //opacity:0.5
    },
    titleTxt:{
        color:COLOR.BLACK,
        fontSize:18,
        fontWeight:'bold'
    },
    linearGradient:{
        width:'100%',
        borderTopRightRadius:5,
        flexDirection:'row-reverse'
    },
    tag:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingTop:10,
        paddingRight:10,
        alignItems:'center',
    },
    tagTxt:{
        color:COLOR.WHITE,
        marginLeft:5
    },
    level:{
        backgroundColor:COLOR.GOLD,
        height:25,
        position:'absolute',
        top:5,
        left:5,
        paddingHorizontal:10,
        borderRadius:5,
        justifyContent:'center'
    },
    levelTxt:{
        fontSize:15,
        fontWeight:'bold'
    },
  });
  
export default ProgramItem2;