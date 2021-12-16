import React, { useState, useCallback, useEffect } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  StatusBar,
  ToastAndroid,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HomeSection from '../components/HomeSection';
import WorkoutItem from '../components/WorkoutItem';
import { COLOR, SCREEN_WIDTH } from '../constant';
import ProgramItem from '../components/ProgramItem';
import HomeCategoryItem from '../components/HomeCategoryItem';
import CommandButton from '../components/CommandButton';
import { getAllWorkout } from '../serverAPIs/workoutAPI';
import { toWorkoutTypeName } from '../backendRules'
import { getAllVideo } from '../serverAPIs/videoAPI';
import { shuffle } from '../utilities/Utilities';
import { getAllProgram } from '../serverAPIs/programAPI';
import { getMe } from '../serverAPIs/getMeAPI';
import { toLevelName } from '../backendRules';

const HOME_BANNER_HEIGHT = 300;
function HomeScreen({ navigation }) {
  const [workoutOfTheDay, setWorkoutOfTheDay] = useState({});
  const [suggestedWorkouts, setSuggestedWorkouts] = useState([]);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [suggestedPrograms, setSuggestedPrograms] = useState([]);
  const [backPressedCount, setBackPressedCount] = useState(0);
  const DUMMY_ARR = ['1', '2', '3'];
  //user info
  const [userInfo, setUserInfo] = useState({});
  const [isLoadingUserInfo, setLoadingUserInfo] = useState(true);
  console.log('HOME user info: ', userInfo);

  useEffect(() => {
    getUserInfo();
    getSuggestedWorkout();
    getSuggestedVideo();
    getSuggestedProgram();
  }, []);

  const getSuggestedVideo = async () => {
    try {
      const res = await getAllVideo();
      if (!res?.data?.videos) throw 'FAIL TO GET VIDEO';
      if (res?.data?.videos?.length > 5) {
        const suggestedList = shuffle(res?.data?.videos);
        setSuggestedVideos(suggestedList.slice(0, 5));
      } else setSuggestedVideos(shuffle(res?.data?.videos));
    } catch (e) {
      console.log(e);
    }
  };

  const getSuggestedWorkout = async () => {
    try {
      const res = await getAllWorkout();
      if (!res?.data?.workouts) throw 'FAIL TO GET WORKOUT';
      const list = res?.data?.workouts?.filter((item) => {
        return toWorkoutTypeName(item?.type) === 'Tập Luyện'
      })
      setWorkoutOfTheDay(list[0])
      if (list?.length > 5) {
        const suggestedList = shuffle(list);
        setSuggestedWorkouts(suggestedList.slice(0, 5));
      } else setSuggestedWorkouts(shuffle(list));
    } catch (e) {
      console.log(e);
    }
  };

  const getSuggestedProgram = async () => {
    try {
      const res = await getAllProgram();
      if (!res?.data?.programs) throw 'FAIL TO GET PROGRAM';
      if (res?.data?.programs?.length > 5) {
        const suggestedList = shuffle(res?.data?.programs);
        setSuggestedPrograms(suggestedList.slice(0, 5));
      } else setSuggestedPrograms(shuffle(res?.data?.programs));
    } catch (e) {
      console.log(e);
    }
  };

  //get user info 
  const getUserInfo = async () => {
    const response = await getMe();
    if (response !== -1) {
      setUserInfo(response?.user);
      setLoadingUserInfo(false);
    }
    else
      console.log('profile - Khong call dc getMe!');
  }

  //Double back press to exit app
  useEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (navigation.isFocused()) {
          setBackPressedCount((backPressedCount) => backPressedCount + 1);
          ToastAndroid.showWithGravity(
            'Nhấn lần nữa để thoát ứng dụng!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
          return true;
        }
        else {
          return false;
        }
      });
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []),
  );

  useEffect(() => {
    // Use a flag (isSubscribed) to determine when to cancel your subscription. 
    // At the end of the effect, you'd make a call to clean up.
    let isSubscribed = true;
    if (backPressedCount === 2 && isSubscribed) {
      BackHandler.exitApp();
    }
    return () => isSubscribed = false;
  }, [backPressedCount]);

  const renderBanner = () => (
    <BackgroundImage
      style={styles.banner}
      source={{
        uri: workoutOfTheDay?.image,
      }}
      resizeMode="cover">
      <View style={styles.todayWorkout}>
        <Text style={styles.todayWorkoutTxt}>Bài Tập Của Ngày</Text>
      </View>

      <LinearGradient
        style={styles.bannerLinearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}></LinearGradient>

      <View style={styles.bannerLeft}>
        <Text style={styles.bannerTxt}>{workoutOfTheDay?.name}</Text>
        <View style={styles.bannerBtnWrapper}>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() => navigation.navigate('WorkoutInfo', {workoutData: workoutOfTheDay})}>
            <Icon
              name="dumbbell"
              type="font-awesome-5"
              size={13}
              color={COLOR.WHITE}
            />
            <Text style={styles.bannerBtnTxt}>Tập Ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerRight}>
        <View style={styles.bannerRightInsider}>
          <Text style={styles.bannerRightTxt}>{workoutOfTheDay?.rounds?.length}</Text>
          <Text style={styles.bannerRightSmallTxt}>Số round</Text>
          <Text style={styles.bannerRightTxt}>{workoutOfTheDay?.rounds?.length * 15}m</Text>
          <Text style={styles.bannerRightSmallTxt}>Thời gian</Text>
          <Text style={[styles.bannerRightTxt, { fontSize: 15 }]}>Medium</Text>
          <Text style={styles.bannerRightSmallTxt}>Level</Text>
        </View>
      </View>
    </BackgroundImage>
  );

  //render user info
  const renderUserInfo = () => {
    if (isLoadingUserInfo)
      return (
        //loading
        <ActivityIndicator
          animating={isLoadingUserInfo}
          color='white'
          hidesWhenStopped >
        </ActivityIndicator>
      )
    else {
      const weight = userInfo?.information?.weight?.slice(-1)[0]?.value;
      const height = userInfo?.information?.height;
      let bmi = ((weight / (height * 2)) * 100).toFixed(2);
      return (
        <View style={styles.userStatus}>
          <View style={styles.userTagWrapper}>
            <View style={[styles.userTag, { borderColor: COLOR.WHITE }]}>
              <Icon
                name="account"
                type="material-community"
                size={14}
                color={COLOR.WHITE}
              />
              <Text style={[styles.userTagTxt, { color: COLOR.WHITE }]}>
                {toLevelName(userInfo.information.level)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
            <View style={{ flex: 5 }}>
              <Text style={styles.numberTxt}>{userInfo.name}</Text>
              <Text style={styles.silverTxt}>
                Chiều Cao: <Text style={styles.numberTxt}>{height} cm</Text> - Cân nặng:
                <Text style={styles.numberTxt}> {weight} kg</Text>
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginTop: -20 }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 20, color: COLOR.DARK_BROWN }}>
                BMI
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.WHITE }}>
                {bmi}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => navigation.navigate('Category')}>
            <Icon
              name="chart-line"
              type="material-community"
              size={20}
              color={COLOR.WHITE}
            />
            <Text style={[styles.userBtnTxt, { marginLeft: 10 }]}>
              Cập nhật chỉ số ngay
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }



  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLOR.MATTE_BLACK }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent></StatusBar>
      {renderBanner()}
      {renderUserInfo()}
      <HomeSection title="Đề xuất cho bạn" onPress={() => { navigation.navigate('AllWorkout') }} />
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH, paddingRight: 30 }}>
            <WorkoutItem
              onPress={()=>{
                console.log("selected workout,===", item)
                navigation.navigate('WorkoutInfo', {workoutData: item})}}
              title={item?.name}
              muscleGroups={item?.muscleGroups}
              image={{
                uri: item?.image,
              }}
              rounds={item?.rounds}
            />
          </View>
        )}
      />
      <HomeSection title="Kiến thức tập luyện" onPress={() => { navigation.navigate('AllVideo') }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedVideos}
        renderItem={({ item, index }) => (
          <View style={{ paddingRight: 15 }} key={index}>
            <ProgramItem
            onPress={()=>{navigation.navigate('WatchVideo', {videoData: item})}}
              style={{height: 200, width: 160}}
              title={item?.name}
              image={{
                uri: item?.image,
              }}
            />
          </View>
        )}
      />
      <HomeSection title="Lộ trình tập luyện" onPress={() => { navigation.navigate('AllProgram') }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedPrograms}
        renderItem={({ item, index }) => (
          <View style={{ paddingRight: 15 }} key={index}>
            <ProgramItem
              icon='dumbbell'
              tagColor={COLOR.BLUE}
              style={{ height: 200, width: 160 }}
              title={item?.name}
              image={{
                uri: item?.image,
              }}
            />
          </View>
        )}
      />
      <HomeSection title="Lựa chọn cách tập của riêng bạn" onPress={() => { }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={DUMMY_ARR}
        renderItem={({ item, index }) => (
          <View style={{ paddingRight: 15 }} key={index}>
            <HomeCategoryItem
              style={{ height: 110, width: 250 }}
              title="Giảm Mỡ"
              subTitle="bao gồm 20 bài tập"
              image={{
                uri: 'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg',
              }}
            />
          </View>
        )}
      />
      <View style={styles.libraryBtnWrapper}>
        <CommandButton
          icon="tag"
          title="Đi đến thư viện bài tập"
          backgroundColor={COLOR.GOLD}
          onPress={async () => { }}
        />
      </View>
      {/* <TouchableOpacity style={{height:50, backgroundColor:'#123123'}} onPress={()=>navigation.navigate('WorkoutInfo')}/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: HOME_BANNER_HEIGHT,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerLinearGradient: {
    position: 'absolute',
    height: HOME_BANNER_HEIGHT,
    width: '100%',
    bottom: 0,
  },
  bannerLeft: {
    paddingLeft: 20,
    paddingBottom: 20,
    flex: 1,
  },
  bannerRight: {
    backgroundColor: '#18151090',
    width: 70,
    height: HOME_BANNER_HEIGHT * 0.6,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'hidden',
    opacity: 1,
  },
  bannerRightInsider: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 0,
  },
  bannerTxt: {
    color: COLOR.WHITE,
    fontSize: 26,
    fontWeight: 'bold',
    width: '90%',
    marginBottom: 15,
  },
  bannerRightTxt: {
    color: COLOR.WHITE,
    fontSize: 20,
  },
  bannerRightSmallTxt: {
    fontSize: 13,
    color: COLOR.GREY,
    marginBottom: 10,
  },
  bannerBtn: {
    backgroundColor: COLOR.RED,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 180,
    borderRadius: 15,
  },
  bannerBtnTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  todayWorkout: {
    backgroundColor: COLOR.GOLD,
    width: 170,
    height: 25,
    position: 'absolute',
    top: 50,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  todayWorkoutTxt: {
    color: COLOR.MATTE_BLACK,
    fontSize: 17,
    fontWeight: 'bold',
  },
  userStatus: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  horizontalList: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  userBtn: {
    width: '100%',
    height: 40,
    backgroundColor: COLOR.LIGHT_BROWN,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userBtnTxt: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  numberTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
  },
  silverTxt: {
    fontSize: 13,
    color: '#aaa9ad',
  },
  userTag: {
    height: 20,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-between',
  },
  userTagWrapper: {
    flexDirection: 'row',
  },
  userTagTxt: {
    fontSize: 11,
    marginLeft: 3,
  },
  libraryBtnWrapper: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
