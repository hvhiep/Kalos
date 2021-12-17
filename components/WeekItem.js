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
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR, SCREEN_WIDTH} from '../constant';
import * as Progress from 'react-native-progress';

function WeekItem(props) {
  const isCompleted = () => {
    const weekCompleted = props?.item?.workouts?.some(item => {
      return item?.completed === false;
    });
    return !weekCompleted;
  };

  return (
    <TouchableOpacity onPress={props?.onPress}>
        <View style={styles.container}>
      <View style={{flex: 0.95, justifyContent: 'space-between'}}>
        <Text style={styles.title}>{props?.item?.name}</Text>
        <View>
          <Text style={styles.tagTxt}>
            Đã hoàn thành: {parseInt(props?.item?.progress * 100) || 0}%
          </Text>
          <Progress.Bar
            progress={props?.item?.progress || 0}
            height={3}
            color={COLOR.MATTE_BLACK}
            unfilledColor={COLOR.LIGHT_GREY}
            width={SCREEN_WIDTH * 0.7}
            borderWidth={0}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {isCompleted() && (
          <Icon
            name="check-circle"
            type="font-awesome-5"
            color={COLOR.LIGHT_BLUE_2}
            size={27}></Icon>
        )}
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    height: 65,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tagTxt: {
    color: COLOR.BLACK,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default WeekItem;
