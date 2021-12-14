import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR, SCREEN_WIDTH } from '../constant';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import BodyIndexPopup from '../components/BodyIndexPopup';
import moment from 'moment';

//test data
import Avatar from '../assets/images/avatar.png';
import BgImage from '../assets/images/ProfileBackground.jpeg';
import bmi from '../assets/images/bmi.png';

//api
import { getMe } from '../serverAPIs/getMeAPI';
import { toLevelName, toGoals } from '../backendRules';
import { updateBodyIndex } from '../serverAPIs/bodyIndexUpdateAPI';

//--------------------------------------------
const HEADER_HEIGHT = 200;

function ProfileScreen({ navigation }) {

  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showHeightModal, setShowHeightModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [weights, setWeights] = useState([1, 2, 3]);
  const [weightDates, setWeightDates] = useState([1, 2, 3]);
  const [isLoadingMainChart, setLoadingMainChart] = useState(true);
  const [isUpdateBodyIndex, setUpdateBodyIndex] = useState(false);

  //BMI
  const BMI = [
    {
      range: [14.9, 16],
      color: '#a8dddb',
      title: 'Thiếu Cân Nguy Hiểm',
    },
    {
      range: [16, 18.5],
      color: '#26289a',
      title: 'Thiếu Cân',
    },
    {
      range: [18.5, 25],
      color: '#1dc44c',
      title: 'Cân Đối',
    },
    {
      range: [25, 30],
      color: '#c4ff0e',
      title: 'Thừa Cân',
    },
    {
      range: [30, 35],
      color: '#ffca18',
      title: 'Béo Phì',
    },
    {
      range: [35, 40],
      color: '#ec1c24',
      title: 'Béo Phì Nguy Hiểm',
    },
  ]

  const ACHIEVEMENTS = [
    10, //total programs
    560, // total workouts
    15 // total trophies
  ]
  //weights data
  const WEIGHT = {
    labels: weightDates,
    datasets: [
      {
        data: weights,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
    ],
    legend: ["Cân nặng"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: COLOR.LIGHT_MATTE_BLACK,
    backgroundGradientTo: COLOR.LIGHT_MATTE_BLACK,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    fillShadowGradient: COLOR.LIGHT_BLUE, //
    fillShadowGradientOpacity: 0.5,
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  useEffect(() => {
    getUserInfo();
    if (isUpdateBodyIndex)
      setUpdateBodyIndex(false);
    
    return () => {
      setUpdateBodyIndex(false);
    }
  }, [isUpdateBodyIndex]);


  //get user info
  const getUserInfo = async () => {
    const response = await getMe();
    if (response !== -1) {
      setUserInfo(response?.user);
      const weightArray = response?.user?.information?.weight;
      //get weight date from weight array
      const weightDates = weightArray.map((item) => {
        const day = moment(item?.time).get('date').toString();
        const month = moment(item?.time).get('month').toString();
        return `${day}/${month}`;
      })
      //get weight value from weight array
      const weightValues = weightArray.map((item) => {
        return item?.value;
      })
      setWeights([...weightValues]);
      setWeightDates([...weightDates]);
      setLoadingMainChart(false);
    }
    else
      console.log('profile - Khong call dc getMe!');
  }


  //new updated weight on current day. Need to update to database.....
  //if type === 1 then update, else then do nothing
  const setNewWeight = async (type, data) => {
    if (type === 1) {
      const response = await updateBodyIndex(data, -1);
      if (response !== -1)
        setUpdateBodyIndex(true);
      else
        console.log('cap nhat weight that bai!');
    }

  };
  const setNewHeight = async (type, data) => {
    if (type === 1) {
      const response = await updateBodyIndex(-1, data);
      if (response !== -1)
        setUpdateBodyIndex(true);
      else
        console.log('cap nhat height that bai!');
    }

  };

  //-------------render function ------------------
  const renderMainChart = () => {
    if (isLoadingMainChart)
      return (
        //loading
        <ActivityIndicator
          animating={isLoadingMainChart}
          color='white'
          hidesWhenStopped >
        </ActivityIndicator>
      )

    return (
      <>
        <LineChart
          style={styles.chart}
          data={WEIGHT}
          width={SCREEN_WIDTH - 20}
          height={220}
          chartConfig={chartConfig}
          bezier />
        <View style={styles.weightWrapper}>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemTitle}>Hiện Tại:</Text>
            <Text style={styles.itemNumber}>{WEIGHT.datasets[0].data.slice(-1)[0]} kg</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemTitle}>Nặng Nhất:</Text>
            <Text style={styles.itemNumber}>{Math.max(...WEIGHT.datasets[0].data)} kg</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemTitle}>Nhẹ Nhất:</Text>
            <Text style={styles.itemNumber}>{Math.min(...WEIGHT.datasets[0].data)} kg</Text>
          </View>
        </View>
      </>

    )
  }

  //render BMI
  const renderBMI = () => {
    //loading
    if (isLoadingMainChart)
      return (
        <ActivityIndicator
          animating={isLoadingMainChart}
          color='white'
          hidesWhenStopped >
        </ActivityIndicator>
      )
    else {
      //calculate bmi base on weight and height
      let bmi = ((weights?.slice(-1)[0] / (userInfo?.information?.height * 2)) * 100).toFixed(2);
      //get bmi name
      const userBMI = BMI.find((item) => {
        if (bmi > item.range[0] && bmi <= item.range[1])
          return true;
        return false;
      });
      const color = userBMI?.color;
      const title = userBMI?.title;
      return (
        <View style={styles.itemWrapper}>
          <Text style={styles.bmiNumber}>Hiện Tại: {bmi} </Text>
          <Text style={[styles.bmiState, { color: color }]}>
            {title}
          </Text>
        </View>
      )
    }
  }
  //-----------------------------------------------

  return (
    <ScrollView style={styles.container}>

      {/* status bar */}
      <StatusBar
        backgroundColor={COLOR.MATTE_BLACK}
        barStyle='white'>
      </StatusBar>

      {/*A. header of profile*/}
      <View style={styles.headerWrapper}>

        {/*1. background image*/}

        <ImageBackground style={styles.headerBackground} source={BgImage}>

          <LinearGradient
            style={styles.headerGradient}
            colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.9 }}>
          </LinearGradient>

          {/*2. setting button */}
          <TouchableOpacity
            style={styles.setting}
            onPress={() => navigation.navigate('Setting', {userInfo})}>
            <Icon
              style={styles.settingIcon}
              name="settings"
              size={22}
              color="white">
            </Icon>
          </TouchableOpacity>

          {/*3. center profile */}
          <View style={styles.profileWrapper}>
            <View style={styles.profileAvatar}>
              <Image style={styles.profileAvatarImg} source={Avatar}></Image>
            </View>
            <Text style={styles.profileUsername}>{userInfo?.name}</Text>
          </View>

          {/*4. info tag */}
          <View style={styles.infoTagWrapper}>
            <Text style={styles.infoTag}>{toLevelName(userInfo?.information?.level)}</Text>
            {/* <Text style={styles.infoTag}>Tăng Cơ</Text> */}
          </View>
        </ImageBackground>
      </View>

      {/*B. body info */}
      <View style={styles.bodyWrapper}>

        {/* 1. total achievements */}
        <View style={styles.sectionWrapper}>
          <View style={styles.achievementsTitleWrapper}>
            <Icon name="emoji-events" type="material" size={22} color='yellow'></Icon>
            <Text style={styles.sectionTitle}>Thành Tích</Text>
          </View>
          <View style={styles.achievementsListItem}>
            {ACHIEVEMENTS.map((item, index) => {
              return (
                <View key={index.toString()} style={styles.achievementsItemWrapper}>
                  <Text style={styles.achievementsItemNumber}>{item}</Text>
                  <Text style={styles.achievementsItemTitle}>{(index === 0 && 'Chương Trình') || (index === 1 && 'Kế Hoạch Tập') || (index === 2 && 'Danh Hiệu')}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* 2. workout history  */}
        {/* <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Lịch Sử</Text>
          <TouchableOpacity style={styles.historyViewMore} onPress={() => navigation.navigate('WorkoutHistory')}>
            <Text style={styles.historyViewMoreText}>Xem</Text>
          </TouchableOpacity>
        </View> */}

        {/* 3. BMI */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>BMI (kg/m2)</Text>
          <View style={styles.bmiImageWrapper}>
            <Image style={styles.bmiImage} source={bmi}></Image>
          </View>
          {renderBMI()}
        </View>

        {/* 4.  user weight chart*/}
        <View style={styles.sectionWrapper}>
          {/* 4.1 chart header */}
          <View style={styles.sectionHeaderWrapper}>
            <TouchableOpacity
              style={styles.sectionUpdateBtn}
              onPress={() => setShowWeightModal(true)}>
              <Icon name="add-box" type="material" size={30} color='white'></Icon>
            </TouchableOpacity>
            {/* popup for editing weight */}
            <BodyIndexPopup
              isShow={showWeightModal}
              changeModalVisible={() => { setShowWeightModal(false) }}
              setData={setNewWeight}
              title="Cân Nặng"
              bodyIndexCurrent={WEIGHT.datasets[0].data.slice(-1)[0]} // weight at current
            >
            </BodyIndexPopup>

            <Text style={styles.chartTitle}>Cân Nặng</Text>
            <Text style={{ width: 30 }}></Text>
          </View>
          {/* 4.2 main chart */}
          {renderMainChart()}

        </View>

        {/* 5. user height */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeaderWrapper}>
            <TouchableOpacity
              style={styles.sectionUpdateBtn}
              onPress={() => setShowHeightModal(true)}>
              <Icon name="edit" type="material" size={30} color='white'></Icon>
            </TouchableOpacity>
            {/* popup for editing weight */}
            <BodyIndexPopup
              isShow={showHeightModal}
              changeModalVisible={() => { setShowHeightModal(false) }}
              setData={setNewHeight}
              title="Chiều Cao"
              bodyIndexCurrent={175} // height at current
            >
            </BodyIndexPopup>
            <Text style={styles.chartTitle}>Chiều Cao</Text>
            <Text style={{ width: 30 }}></Text>
          </View>
          <View style={[styles.itemWrapper, { marginTop: 30 }]}>
            <Text style={styles.itemTitle}>Hiện Tại:</Text>
            <Text style={styles.itemNumber}>{userInfo?.information?.height} cm</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLOR.MATTE_BLACK
  },
  headerWrapper: {
    width: '100%',
    height: HEADER_HEIGHT,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerGradient: {
    position: 'absolute',
    height: HEADER_HEIGHT,
    width: '100%',
    bottom: 0,
  },
  setting: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  settingIcon: {

  },
  profileWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileAvatar: {
    borderWidth: 2,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: 'white'
  },
  profileAvatarImg: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  profileUsername: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,

  },
  infoTagWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 16
  },
  infoTag: {
    color: 'white',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    fontSize: 14,

  },

  bodyWrapper: {
    marginTop: 7,
    marginBottom: 10,
  },
  sectionWrapper: {
    marginHorizontal: 10,
    marginVertical: 3,
    padding: 10,
    borderRadius: 6,
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    alignItems: 'center',
  },
  achievementsTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  achievementsListItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementsItemWrapper: {
    alignItems: 'center',
    color: 'white'
  },
  achievementsItemNumber: {
    color: COLOR.LIGHT_BROWN,
    fontSize: 24,
    fontWeight: 'bold',

  },
  achievementsItemTitle: {
    color: 'white',
  },
  historyCalendar: {
    width: '100%',
    paddingHorizontal: 10,
  },
  historyViewMore: {
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyViewMoreText: {

  },
  sectionHeaderWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chart: {
    marginTop: 10,
    marginRight: 10
  },
  weightWrapper: {
    marginTop: 10,
    width: '100%',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%'
  },
  itemTitle: {
    color: COLOR.LIGHT_GREY,
    fontSize: 16,
  },
  itemNumber: {
    color: COLOR.LIGHT_GREY,
    fontSize: 16,
  },
  bmiImageWrapper: {
    width: '100%',
    height: 100,
  },
  bmiImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  bmiNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bmiState: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
export default ProfileScreen;
