import React, {useState, useEffect, useRef, useMemo} from 'react';
import {Image,
    Text,
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
}
from 'react-native';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {COLOR, SCREEN_WIDTH} from '../../constant';
import ExeciseItem from '../../components/ExeciseItem';
import {Button} from 'react-native-elements'
import ExcerciseInfoScreen from '../Exercise/ExerciseInfoScreen';
import ExerciseBottomSheetContent from '../Exercise/ExerciseBottomSheetContent';
import BottomSheet from '@gorhom/bottom-sheet';
import SheetExerciseDetail from '../../components/SheetExerciseDetail';
import { getFavoriteExercises} from '../../serverAPIs/favoriteAPI'

function FavoriteExerciseScreen({navigation, route})
{
    const {favoriteExercises} = route.params;
    const [exercisesData, setExercisesData] = useState(favoriteExercises)
    const [selectedExercise, setSelectedExercise] = useState(null)
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%','90%'], []);

    return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.layoutContainer}>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Bài tập đã lưu</Text>
            </View>
            <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={exercisesData}
            renderItem={({item})=>(
            <View style={{width:SCREEN_WIDTH}}>
                <ExeciseItem 
                    exercise = {item}
                    onPress = {()=>{
                        console.log("selected exc===",item);
                        setSelectedExercise(item)
                        // bottomSheetRef.current.expand();
                        bottomSheetRef.current.snapTo(1)
                    }}/>
            </View>
            )}
            />
        </View>

        <SheetExerciseDetail
            bottomSheetRef={bottomSheetRef}
            initialSnap={0}
            exerciseDetail={selectedExercise}
            handleLikePress={async ()=>{
                // setExercisesData(prev => prev.map(val =>val._id === selectedExercise?._id ? {...val, liked: !val.liked} : val))
                let excArr = [...exercisesData]
                let index = exercisesData.indexOf(selectedExercise)
                if (index != -1)
                {
                    excArr[index] = {...excArr[index], liked: !excArr[index].liked}
                    setExercisesData(excArr)
                }
                
            }}
            customizeSnapPoint = {[0, '90%', '50%']}>
        </SheetExerciseDetail>
    </SafeAreaView>
    
    )
    
};

const styles = StyleSheet.create({
    layoutContainer:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
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
    modalContainer:{
        flex: 0.75,
        backgroundColor: '#FFFFFF',
    }
})

export default FavoriteExerciseScreen;