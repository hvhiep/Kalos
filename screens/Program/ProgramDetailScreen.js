import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLOR} from '../../constant';
import LinearGradient from 'react-native-linear-gradient';
import {Searchbar} from 'react-native-paper';
import ProgramItem from '../../components/ProgramItem';
import {getAllVideo} from '../../serverAPIs/videoAPI';
import { getAllProgram, getProgramById } from '../../serverAPIs/programAPI';
import { toLevelName } from '../../backendRules';
import LoadingView from '../../components/LoadingView'
import WeekItem from '../../components/WeekItem';
import HeartButton from '../../components/HeartButton'
import {toggleProgramLike} from '../../serverAPIs/favoriteAPI'

const HEADER_HEIGHT = 300; // height of the image
const SCREEN_HEADER_HEIGHT = 100; // height of the header contain back button

function ProgramDetailScreen({navigation, route}) {
    const {programId} = route.params || {}
    const [program, setProgram] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [liked, setLiked] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    
    return unsubscribe;
  }, [programId]);

  const getData = async () => {
    try {
      setIsLoading(true)
      console.log(programId)
        const res = await getProgramById(programId);
        if (!res?.data?.program) throw 'FAIL TO GET PROGRAM';
        setProgram(res?.data?.program);
        setLiked(res?.data?.program?.liked)
      } catch (e) {
        console.log(e);
      }
      finally{
        setIsLoading(false)
      }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Animated.Image
        style={[
          styles.headerImg,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          },
        ]}
        source={{
          uri: program?.image,
        }}
        resizeMode="cover"></Animated.Image>
      <Animated.View style={styles.headerContentWrapper}>            
      <HeartButton style={styles.likeBtn} isliked={liked} 
              onButtonPress={()=>{
                setLiked(like => !like) 
                toggleProgramLike(program?._id)
              }}/>

        <View style={styles.headerTxtWrapper}>
          <Text style={styles.infoTxt}>Level: {toLevelName(program?.level)}</Text>
          <Text style={styles.infoTxt}>Thời gian: {program?.weeks?.length} tuần</Text>
          <Text style={styles.headerTxt}>{program?.name}</Text>
        </View>
        <LinearGradient
          style={styles.linearGradient}
          start={{x: 0.0, y: 0.8}}
          end={{x: 0.0, y: 0.0}}
          colors={[COLOR.LIGHT_MATTE_BLACK, 'transparent']}>
          </LinearGradient>
      </Animated.View>
    </View>
  );

  const renderItem = item => (
    <View style={styles.itemWrapper}>
      <WeekItem
              onPress={()=>{navigation.navigate('WeekDetail', {weekData: item, programId: programId})}}
              item={item}
            />
    </View>
  );

  if(isLoading) return<View style={{flex:1, backgroundColor:COLOR.MATTE_BLACK}}>
    <LoadingView/>
  </View>
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent />
      <Animated.FlatList
        style={styles.flatlist}
        data={program?.weeks}
        keyExtractor={({item, index}) => index}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        ListHeaderComponent={renderHeader()}
        renderItem={({item}) => renderItem(item)}
        ListFooterComponent={() => (
          <View style={{height: 50}} />
        )}></Animated.FlatList>
      <Animated.View
        style={[
          styles.screenHeader,
          {
            opacity: scrollY.interpolate({
              inputRange: [0 + 10, HEADER_HEIGHT - SCREEN_HEADER_HEIGHT],
              outputRange: [0, 1],
            }),
          },
        ]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.titleTxt,
            {
              transform: [
                {
                  translateX: scrollY.interpolate({
                    inputRange: [10, 70, 9999],
                    outputRange: [100, 0, 0],
                  }),
                },
              ],
            },
          ]}>
          Chương trình tập
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.searchWrapper,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 40, 99999],
                  outputRange: [
                    0,
                    -(HEADER_HEIGHT - SCREEN_HEADER_HEIGHT + 50),
                    -(HEADER_HEIGHT - SCREEN_HEADER_HEIGHT - 60),
                  ],
                }),
              },
            ],
          },
        ]}>
        <Animated.Text style={[styles.infoTxt, {opacity:scrollY.interpolate({
                  inputRange: [0, 40, 99999],
                  outputRange: [
                    1,
                    0,
                    0,
                  ],
                })}]}>Bạn đã hoàn thành được: {parseInt(program?.progress * 100)}% chương trình</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    height: SCREEN_HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: COLOR.MATTE_BLACK,
    paddingTop: 45,
  },
  header: {
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLOR.MATTE_BLACK,
    marginTop: -10000,
    paddingTop: 10000,
    marginBottom: 50,
  },
  headerContentWrapper: {
    position: 'absolute',
    bottom: 0,
    //backgroundColor:'#fff',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerTxtWrapper: {
    marginLeft: 20,
  },
  headerTxt: {
    color: COLOR.WHITE,
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
    fontWeight:'bold'
  },
  flatlist: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
  },
  itemWrapper: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    paddingVertical: 10,
    paddingHorizontal:10
  },
  excersiseWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: COLOR.WHITE,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
  },
  itemImg: {
    width: 120,
    height: 60,
    borderRadius: 7,
  },
  txtWrapper: {
    paddingHorizontal: 10,
  },
  excersiseName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR.WHITE,
  },
  excersiseInfo: {
    fontSize: 13,
    color: COLOR.LIGHT_GREY,
  },
  headerImg: {
    height: HEADER_HEIGHT,
    width: '200%',
    opacity: 0.5,
  },
  linearGradient: {
    height: HEADER_HEIGHT / 4,
    width: '100%',
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 20,
    alignSelf: 'center',
  },
  searchWrapper: {
    position: 'absolute',
    width: '100%',
    top: HEADER_HEIGHT,
    paddingHorizontal: 10,
  },
  divider: {
    backgroundColor: COLOR.WHITE,
    height: 1,
    marginHorizontal: 20,
  },
  sortBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  likeBtn:{
    position: 'absolute',
    top: 30,
    right: 30,
  }
});

export default ProgramDetailScreen;
