import React, {useState, useRef, useMemo} from 'react';
import {Image,
    Text,
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    Modal,
    
}
from 'react-native';
import {Icon} from 'react-native-elements';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {COLOR, SCREEN_WIDTH} from '../constant';
import WorkoutItem from '../components/WorkoutItem'
import ProgramItem from '../components/ProgramItem';
import ImageOverlayCard from '../components/ImageOverlayCard';
import VideoScreen from './FavoriteScreens/VideoScreen';
import VideoItem from '../components/VideoItem'
import HomeSection from '../components/HomeSection';

function FavoriteScreen({navigation})
{
    const [suggestedWorkouts, setSuggestedWorkouts] = useState(['1','2','3'])

    return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.layoutContainer}>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Nội dung yêu thích</Text>
            </View>
            <ScrollView style={styles.content}>
                <View>
                    <Text style = {styles.description}>Các bài tập, chương trình tập bạn đã yêu thích sẽ được lưu tại đây theo từng hạng mục</Text>
                </View>
                {/* <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Lộ trình tập</Text>
                    <TouchableWithoutFeedback
                    onPress={()=>{navigation.navigate('FavoritePrograms')}}>
                        <Text style = {styles.moreText}>Xem tất cả</Text>
                    </TouchableWithoutFeedback>
                </View> */}
                <HomeSection
                title="Lộ trình tập"
                onPress={()=>{
                    navigation.navigate('FavoritePrograms')
                }}/>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={suggestedWorkouts}
                renderItem={(item)=>(
                    <ProgramItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}
                    title="Cach tap luyen ABC XYZ"
                    style={{height: 200, width: 200, padding: 10}}
                    />
                )}
                />


                {/* <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Kế hoạch tập</Text>
                    <TouchableWithoutFeedback
                    onPress={()=>{}}>
                        <Text style = {styles.moreText}>Xem tất cả</Text>
                    </TouchableWithoutFeedback>
                </View> */}
                <HomeSection title = "Kế hoạch tập" onPress={()=>{
                    navigation.navigate('FavoriteWorkouts')
                }}/>
                <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={suggestedWorkouts}
                renderItem={(item)=>(
                <View style={{width:SCREEN_WIDTH, padding: 15}}>
                    <WorkoutItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}
                        />
                </View>
                )}
                />

                {/* <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Video</Text>
                    <TouchableWithoutFeedback
                    onPress={()=>{navigation.navigate('FavoriteVideos')}}>
                        <Text style = {styles.moreText}>Xem tất cả</Text>
                        <Icon />
                    </TouchableWithoutFeedback>
                </View> */}
                <HomeSection title = "Video"
                onPress = {()=>{navigation.navigate('FavoriteVideos')}}/>
                <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={suggestedWorkouts}
                renderItem={(item)=>(
                <View style={{width:SCREEN_WIDTH}}>
                    <VideoItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}
                    isLiked
                    onPress = {()=>{
                        var data = {videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"};
                        navigation.push('VideoScreen', data);
                    }}
                    />
                </View>
                )}
                />


                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Bài tập</Text>
                </View>
                <View style={{width:SCREEN_WIDTH}}>
                    <ImageOverlayCard 
                    image={{uri:'http://ghemassagetoanthan.org/wp-content/uploads/2021/05/tap-luyen-push-up-truyen-thong-va-bien-the-3.jpg'}}
                    title="Bài tập đã thích"
                    onPress={()=>{navigation.navigate('FavoriteExercises')}}/>
                </View>

                
                
            </ScrollView>

        </View>
        
    </SafeAreaView>
    
    )
    
};

const styles = StyleSheet.create({
    layoutContainer:{

        flex: 1,
        backgroundColor: COLOR.MATTE_BLACK,
    },
    header: {
        padding: 10, 
        marginTop: 30,
        textAlign: 'left',
        alignItems:'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLOR.WHITE
    },
    title: {
        fontSize: 18,
        color: COLOR.WHITE,
        fontWeight: 'bold'
    },
    moreText: {
        fontSize: 18,
        fontWeight: '400',
        textTransform: 'capitalize',
        color: COLOR.GOLD,
    },
    content:{
        flex: 1,
    },
    description: {
        fontSize: 15,
        color: "rgba( 255, 255, 255, 0.85) ",
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    categoryTitle:{
        paddingHorizontal: 10,
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    popUpContainer:{
        flex: 0.5,
        backgroundColor: "#000000B2",
        
    },
})

export default FavoriteScreen;