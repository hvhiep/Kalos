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
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import NotFoundItemCard from '../components/NotFoundItemCard'


import {getFavoriteVideos, getFavoriteWorkouts, getFavoritePrograms, getFavoriteExercises} from '../serverAPIs/favoriteAPI'

function FavoriteScreen({navigation})
{
    const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
    const [favoritePrograms, setFavoritePrograms] = useState([])
    const [favoriteVideos, setFavoriteVideos] = useState([])
    const [favoriteExercises, setFavoriteExercises] = useState([])

    const [isLoadingWorkouts, setLoadingWorkouts] = useState(false)
    const [isLoadingPrograms, setLoadingPrograms] = useState(false)
    const [isLoadingVideos, setLoadingVideos] = useState(false)
    const [isLoadingExercises, setLoadingExercises] = useState(false)
    const isFirstTimeLoading = useRef(true)

    const [isRefreshing, setRefreshing] = useState(false);

    const mapIsLikedArray= (array)=>array.map(val => ({...val, liked: true}))
    console.log("is refreshing, ", isRefreshing)
    const onRefreshing = useCallback(
        async () => {
            if (isFirstTimeLoading.current)
            {
                setLoadingPrograms(true);
                setLoadingVideos(true);
                setLoadingWorkouts(true);
                setLoadingExercises(true);
            }
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
                setFavoriteExercises(mapIsLikedArray(data));
                setLoadingExercises(false);
            })

        },[isRefreshing]);

    useEffect(()=>{
        console.log("run on refreshing ", isRefreshing)
        // set Loading effect run
        setRefreshing(true);

        onRefreshing()

        setRefreshing(false);
        isFirstTimeLoading.current = false;

        const willFocusSubscription = navigation.addListener('focus', () => {
            onRefreshing();
        });
    
        return willFocusSubscription;
    
    },[])

    const RenderWorkouts = () =>
    {
        if (isLoadingWorkouts)
            return(<ActivityIndicator animating={isLoadingWorkouts} color='blue' hidesWhenStopped ></ActivityIndicator>)
        
        if (favoriteWorkouts.length == 0)
        {
            return (
                <View style={{width:SCREEN_WIDTH}}>
                    <NotFoundItemCard title="K??? ho???ch t???p y??u th??ch c???a b???n s??? hi???n th??? ??? ????y"
                    onPress={()=>{navigation.navigate('AllWorkout')}}
                    buttonTitle="Xem th??m th?? vi???n k??? ho???ch t???p"
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
                    onPress={()=>{navigation.navigate('WorkoutInfo', {workoutId: item?._id})}}
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
                    <NotFoundItemCard title="L??? tr??nh y??u th??ch c???a b???n s??? hi???n th??? ??? ????y"
                    onPress={()=>{navigation.navigate('AllProgram')}}
                    buttonTitle="Xem th??m th?? vi???n l??? tr??nh t???p"
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
                return(
                    <View style={{paddingLeft: 15}}>
                        <ProgramItem
                            onPress={()=>{navigation.navigate('ProgramDetail', {programId: item?._id})}}
                            icon='dumbbell'
                            tagColor={COLOR.BLUE}
                            style={{ height: 200, width: 160 }}
                            title={item?.name}
                            image={{
                                uri: item?.image,
                            }}/>
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
                    <NotFoundItemCard title="Video y??u th??ch c???a b???n s??? hi???n th??? ??? ????y"
                    onPress={()=>{navigation.navigate('AllVideo')}}
                    buttonTitle="Xem th??m c??c video"
                    image={{uri: "https://dfd5gcc6b7vw5.cloudfront.net/assets/thenx-header-b0f1a2685be5ff4f739a7333baf90c8045a39f170347548609b634e39709357c.jpg"}}
                    >

                    </NotFoundItemCard>
                </View>
            );
        }

        return (
            <FlatList
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
                    <NotFoundItemCard title="B??i t???p y??u th??ch c???a b???n s??? hi???n th??? ??? ????y"
                    onPress={()=>{navigation.navigate('AllExercise')}}
                    buttonTitle="Xem th??m c??c b??i t???p"
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
                title={favoriteExercises.length + " B??i t???p ???? l??u"}
                onPress={()=>{navigation.navigate('FavoriteExercises', { favoriteExercises: favoriteExercises.map(val => ({...val, liked: true})) })}}/>
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
                <Text style = {styles.headerText}>N???i dung y??u th??ch</Text>
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
                    <Text style = {styles.description}>C??c b??i t???p, ch????ng tr??nh t???p b???n ???? y??u th??ch s??? ???????c l??u t???i ????y theo t???ng h???ng m???c</Text>
                </View>
                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>L??? tr??nh t???p</Text>
                </View>
                {RenderPrograms()}


                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>K??? ho???ch t???p</Text>
                </View>
                {RenderWorkouts()}

                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>Video</Text>
                </View>
                {RenderVideos()}
                


                <View style = {styles.categoryTitle}>
                    <Text style = {styles.title}>B??i t???p</Text>
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