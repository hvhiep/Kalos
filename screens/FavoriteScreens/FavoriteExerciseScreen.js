import React, {useState, useCallback, useRef, useMemo} from 'react';
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
import BottomSheet from '@gorhom/bottom-sheet';


function FavoriteExerciseScreen()
{
    const [likedExercises, setLikedExercise] = useState([1,2,3,1,1])

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
            data={likedExercises}
            renderItem={(item)=>(
            <View style={{width:SCREEN_WIDTH}}>
                <ExeciseItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}
                    isLiked = {true}
                    title="Hít đất nâng cao dành cho người mới"
                    onPress = {()=>{
                        bottomSheetRef.current.expand();
                    }}/>
            </View>
            )}
            />
        </View>
        
        <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        >
            <ExcerciseInfoScreen/>
        </BottomSheet>

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