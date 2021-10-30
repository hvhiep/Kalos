import React, {useState} from 'react';
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
import {BottomSheet, Button} from 'react-native-elements'
import ExcerciseInfoScreen from '../Exercise/ExerciseInfoScreen';
function FavoriteExerciseScreen()
{
    const [modalVisible, setModalVisible] = useState(false);
    const [likedExercises, setLikedExercise] = useState([1,2,3,1,1])
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
                    title="Hít đất nâng cao dành cho người mới"
                    onPress = {()=>setModalVisible(true)}/>
            </View>
            )}
            />
        </View>
        <BottomSheet
        isVisible = {modalVisible}
        containerStyle = {{backgroundColor: 'rgba(0,0,0,0.5)'}}
        >
            <View style = {styles.modalContainer}>
                <ScrollView>
                    <ExcerciseInfoScreen/>
                    
                </ScrollView>
                <Button title = "Đóng"
                onPress={()=>setModalVisible(false)}
                titleStyle = {{color: COLOR.WHITE}}
                buttonStyle = {{backgroundColor: COLOR.RED}}/>
            </View>
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