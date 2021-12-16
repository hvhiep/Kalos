import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {COLOR} from '../constant';

function WorkoutProgressBar(props) {
  return (
    <View style={props.style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 20,
          //backgroundColor: COLOR.BLUE,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}>
        {props?.listExcercise.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: 4,
                borderRadius: 3,
                backgroundColor:
                  props?.currentIndex === index
                    ? COLOR.WHITE
                    : (item?.isDone
                    ? COLOR.BLUE
                    : (props?.currentIndex < index ? COLOR.GREY : COLOR.RED)),
                width: 95 / props?.length + '%',
              }}></View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default WorkoutProgressBar;
