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
import WorkoutItem from '../../components/WorkoutItem';
function FavoriteProgramScreen()
{
    const [likedPrograms, setLikedProgram] = useState([1,2,3,1,1])
    return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.layoutContainer}>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Lộ trình yêu thích</Text>
            </View>
            <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.content}
            data={likedPrograms}
            renderItem={(item)=>(
            <View style={{width:SCREEN_WIDTH, padding: 20}}>
                <WorkoutItem
                style = {{height: 200}}
                image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}
                />
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

export default FavoriteProgramScreen;