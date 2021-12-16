import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {COLOR} from '../../constant';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from 'moment';
import HeartButton from '../../components/HeartButton';
import {getVideoById} from '../../serverAPIs/videoAPI';
import {color} from 'react-native-reanimated';
import {Icon} from 'react-native-elements';
import {toWorkoutTypeName} from '../../backendRules';
import CustomModal from '../../components/CustomModal';
import {submitWorkout} from '../../serverAPIs/workoutAPI';
import Toast from 'react-native-toast-message';

function WeekDetailScreen({navigation, route}, props) {
  const {weekData, programId} = route.params || {};
  const [showModalConfirmRest, setShowModalConfirmRest] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState({});

  useEffect(() => {}, []);

  const onConfirmRest = async () => {
    setShowModalConfirmRest(false);
    selectedWorkout.completed = true; //hien thi thoi
    try {
      const res = await submitWorkout(selectedWorkout?._id, 0);
      if (!res) throw 'Đã xảy ra lỗi';
      setSelectedWorkout({...selectedWorkout, completed:true})
      let updateWeekWorkout = weekData?.workouts?.find((item)=>{return item?._id === selectedWorkout?._id})
      console.log(updateWeekWorkout)
      updateWeekWorkout.completed = true
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: e + ' 👋',
      });
    }
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (toWorkoutTypeName(item?.type) === 'Tập Luyện')
            navigation.navigate('WorkoutInfo', {workoutId: item?._id});
          else
           {
            setSelectedWorkout(item);
            setShowModalConfirmRest(true);
          }
        }}>
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            height: 65,
            width: '100%',
            marginVertical: 5,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: COLOR.MATTE_BLACK,
            }}>
            <Text style={styles.indexTxt}>{index}</Text>
          </View>
          <View style={{paddingHorizontal: 15, flex: 1}}>
            <Text style={styles.nameTxt}>
              Ngày {index + ' - ' + item?.name}
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {item?.completed && (
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
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: COLOR.MATTE_BLACK,
          width: '100%',
          height: 90,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 20,
        }}>
        <Text adjustsFontSizeToFit style={styles.headerTxt}>
          {weekData?.name}
        </Text>
      </View>
      <FlatList
        style={styles.flatlist}
        data={weekData?.workouts}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <CustomModal
        visible={showModalConfirmRest}
        title="Bạn có chắc xác nhận hoàn thành ngày nghỉ ?"
        onConfirm={() => {
          onConfirmRest();
        }}
        onCancel={() => setShowModalConfirmRest(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_GREY,
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLOR.WHITE,
  },
  indexTxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameTxt: {
    color: COLOR.BLACK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  flatlist: {
    //backgroundColor:COLOR.WHITE,
    paddingHorizontal: 10,
  },
});

export default WeekDetailScreen;
