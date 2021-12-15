import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Image,
    Text,
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    Modal,
    ActivityIndicator,
    RefreshControl,
    FlatList,
    ScrollView
}
from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {COLOR, SCREEN_WIDTH} from '../constant';
import WorkoutItem from '../components/WorkoutItem'
import ProgramItem from '../components/ProgramItem';
import ImageOverlayCard from '../components/ImageOverlayCard';
import VideoScreen from './FavoriteScreens/VideoScreen';
import VideoItem from '../components/VideoItem'
import HomeSection from '../components/HomeSection';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import NotFoundItemCard from '../components/NotFoundItemCard'


import {getFavoriteVideos, getFavoriteWorkouts, getFavoritePrograms, getFavoriteExercises} from '../serverAPIs/favoriteAPI'

function FavoriteScreen({navigation})
{
    const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
    const [favoritePrograms, setFavoritePrograms] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [favoriteExercises, setFavoriteExercises] = useState([])

    const [isLoadingWorkouts, setLoadingWorkouts] = useState(true)
    const [isLoadingPrograms, setLoadingPrograms] = useState(true)
    const [isLoadingVideos, setLoadingVideos] = useState(true)
    const [isLoadingExercises, setLoadingExercises] = useState(true)

    const [isRefreshing, setRefreshing] = useState(false);

    console.log("is refreshing, ", isRefreshing)
    const onRefreshing = useCallback(
        async () => {
            console.log("run on refreshing ", isRefreshing)
            // set Loading effect run
            setRefreshing(true);
            setLoadingPrograms(true);
            setLoadingVideos(true);
            setLoadingWorkouts(true);
            setLoadingExercises(true);
            // fetch data
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
            getFavoriteExercises((data)=>{
                setFavoriteExercises(data);
                setLoadingExercises(false);
            })

            setRefreshing(false);
        },[isRefreshing]);

    useEffect(()=>{
        onRefreshing()
    },[])

    const RenderWorkouts = () =>
    {
        if (isLoadingWorkouts)
            return(<ActivityIndicator animating={isLoadingWorkouts} color='blue' hidesWhenStopped ></ActivityIndicator>)
        
        if (favoriteWorkouts.length == 0)
        {
            return (
                <View style={{width:SCREEN_WIDTH}}>
                    <NotFoundItemCard title="Kế hoạch tập yêu thích của bạn sẽ hiển thị ở đây"
                    onPress={()=>{navigation.navigate('AllWorkout')}}
                    buttonTitle="Xem thêm thư viện kế hoạch tập"
                    image={{uri: "https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"}}
                    >

                    </NotFoundItemCard>
                </View>
            );
        }

        return(
            <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={favoriteWorkouts}
                renderItem={({item})=>(
                <View style={{width:SCREEN_WIDTH, padding: 15}}>
                    <WorkoutItem
                    title={item?.name}
                    muscleGroups={item?.muscleGroups}
                    image={{
                        uri: item?.image,
                    }}
                    rounds={item?.rounds}
                    onPress={()=>{navigation.navigate('WorkoutInfo', {workoutData: item, isLiked: true})}}
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
        
        if (favoritePrograms.length == 0)
        {
            return (
                <View style={{width:SCREEN_WIDTH}}>
                    <NotFoundItemCard title="Lộ trình yêu thích của bạn sẽ hiển thị ở đây"
                    onPress={()=>{navigation.navigate('AllProgram')}}
                    buttonTitle="Xem thêm thư viện lộ trình tập"
                    image={{uri: "https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"}}
                    >

                    </NotFoundItemCard>
                </View>
            );
        }

        return (<FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
            data={favoritePrograms}
            keyExtractor={item => item._id}
            renderItem={({item})=>{
                console.log("program-item ----", item)
                return(
                    <View style={{paddingRight: 15}}>
                        <ProgramItem
                        icon='dumbbell'
                        tagColor={COLOR.BLUE}
                        style={{height: 200, width: 160}}
                        title={item?.name}
                        image={{
                            uri: item?.image,
                        }}
                        />
                    </View>
            )}}
            />)
    }

    const RenderVideos = () => {
        if (isLoadingVideos)
            return (<ActivityIndicator animating={isLoadingVideos} color='blue' hidesWhenStopped ></ActivityIndicator>);
        
        if (favoriteVideos.length == 0)
        {
            return (
                <View style={{width:SCREEN_WIDTH}}>
                    <NotFoundItemCard title="Video yêu thích của bạn sẽ hiển thị ở đây"
                    onPress={()=>{navigation.navigate('AllVideo')}}
                    buttonTitle="Xem thêm các video"
                    image={{uri: "https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"}}
                    >

                    </NotFoundItemCard>
                </View>
            );
        }

        return (
            <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                data={favoriteVideos}
                renderItem={({item})=>(
                    <View style={{paddingLeft: 15}}>
                        <ProgramItem
                        onPress={()=>{
                            console.log("video item ====== ", item)
                            navigation.navigate('WatchVideo', {videoData: item})}}
                        style={{height: 200, width: 160}}
                        title={item?.name}
                        image={{
                            uri: item?.image,
                        }}
                        />
                    </View>
                )}
                />
        )
    }

    const RenderExercises = () => {
        if (isLoadingExercises)
            return (<ActivityIndicator animating={isLoadingExercises} color='blue' hidesWhenStopped ></ActivityIndicator>);
        
        if (favoriteExercises.length == 0)
        {
            return (
                <View style={{width:SCREEN_WIDTH}}>
                    <NotFoundItemCard title="Bài tập yêu thích của bạn sẽ hiển thị ở đây"
                    onPress={()=>{navigation.navigate('AllExercise')}}
                    buttonTitle="Xem thêm các bài tập"
                    image={{uri: "https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"}}
                    >

                    </NotFoundItemCard>
                </View>
            );
        }

        return (
            <View style={{width:SCREEN_WIDTH}}>
                <ImageOverlayCard 
                image={{uri:'http://ghemassagetoanthan.org/wp-content/uploads/2021/05/tap-luyen-push-up-truyen-thong-va-bien-the-3.jpg'}}
                title={favoriteExercises.length + " Bài tập đã lưu"}
                onPress={()=>{navigation.navigate('FavoriteExercises', {favoriteExercises: favoriteExercises})}}/>
            </View>
        )
    }

    console.log("video ===== ", favoriteVideos)
    console.log("programs ===== ", favoritePrograms)
    console.log("workout ===== ", favoriteWorkouts)
    console.log("exercises ===== ", favoriteExercises)
    return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.layoutContainer}>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Nội dung yêu thích</Text>
            </View>
            <ScrollView style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefreshing}
                    />
                }
            >
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
                {RenderExercises()}

                
                
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
        padding: 10,
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