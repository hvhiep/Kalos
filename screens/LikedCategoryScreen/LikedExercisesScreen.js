import React, {useState} from 'react';
import {Image,
    Text,
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView
}
from 'react-native';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {COLOR, SCREEN_WIDTH} from '../../constant';
import ExeciseItem from '../../components/ExeciseItem';
function LikedExercisesScreen()
{
    const [likedExercises, setLikedExercise] = useState([1,2,3,1,1,,3,66,4,4,5,5,9])
    return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.layoutContainer}>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Bài tập đã lưu</Text>
            </View>
            <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.content}
            data={likedExercises}
            renderItem={(item)=>(
            <View style={{width:SCREEN_WIDTH}}>
                <ExeciseItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}
                    isLiked = {true}
                    title="Hít đất nâng cao dành cho người mới"/>
            </View>
            )}
            />
        </View>
        
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
})

export default LikedExercisesScreen;