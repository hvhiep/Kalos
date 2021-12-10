import React, {useState, useRef, useEffect} from 'react';
import {Image,
    Text,
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    Modal,
    ActivityIndicator
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
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

import {getFavoriteVideos, getFavoriteWorkouts, getFavoritePrograms} from '../serverAPIs/favoriteAPI'

function FavoriteScreen({navigation})
{
    const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
    const [favoritePrograms, setFavoritePrograms] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [isLoadingWorkouts, setLoadingWorkouts] = useState(true)
    const [isLoadingPrograms, setLoadingPrograms] = useState(true)
    const [isLoadingVideos, setLoadingVideos] = useState(true)
     
    useEffect(()=>{
        getFavoritePrograms(data =>{
            setFavoritePrograms(data)
            setLoadingPrograms(false);
        });
        getFavoriteWorkouts((data)=>{
            setFavoriteWorkouts(data);
            setLoadingWorkouts(false);
        });
        getFavoriteVideos((data)=>{
            setFavoriteVideos(data);
            setLoadingVideos(false);
        });
        console.log("video ===== ", favoriteVideos)
        console.log("programs ===== ", favoritePrograms)
        console.log("workout ===== ", favoriteWorkouts)
    },[])

    const RenderWorkouts = () =>
    {
        if (isLoadingWorkouts)
            return(<ActivityIndicator animating={isLoadingWorkouts} color='blue' hidesWhenStopped ></ActivityIndicator>)
        
        return(
            <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={favoriteWorkouts}
                renderItem={({item})=>(
                <View style={{width:SCREEN_WIDTH, padding: 15}}>
                    <WorkoutItem image={{uri: item.image}}
                        />
                </View>
                )}
            />
        )
    }

    const RenderPrograms = () =>
    {
        if (isLoadingPrograms)
            return (<ActivityIndicator animating={isLoadingPrograms} color='blue' hidesWhenStopped ></ActivityIndicator>);
        
        return (<FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
            data={favoritePrograms}
            renderItem={({item})=>{
                console.log("program-item ----", item)
                return(
                <ProgramItem image={{uri:item.image}}
                title={item.name}
                style={{height: 200, width: 200, padding: 10}}
                />
            )}}
            />)
    }

    const RenderVideos = () => {
        if (isLoadingVideos)
            return (<ActivityIndicator animating={isLoadingVideos} color='blue' hidesWhenStopped ></ActivityIndicator>);
        
        return (
            <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={favoriteVideos}
                renderItem={({item})=>(
                <View style={{width:SCREEN_WIDTH}}>
                    <VideoItem image={{uri:item.image}}
                    isLiked
                    title={item.name}
                    onPress = {()=>{
                        var data = {videoUrl: item.videoUrl,
                                    title: item.name};
                        navigation.push('VideoScreen', data);
                    }}
                    />
                </View>
                )}
                />
        )
    }

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
                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Lộ trình tập</Text>
                </View>
                {RenderPrograms()}


                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Kế hoạch tập</Text>
                </View>
                {RenderWorkouts()}

                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Video</Text>
                </View>
                {RenderVideos()}
                


                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Bài tập</Text>
                </View>
                <View style={{width:SCREEN_WIDTH}}>
                    <ImageOverlayCard 
                    image={{uri:'http://ghemassagetoanthan.org/wp-content/uploads/2021/05/tap-luyen-push-up-truyen-thong-va-bien-the-3.jpg'}}
                    title="Bài tập đã lưu"
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
        fontSize: 23,
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
        marginTop: 15,
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