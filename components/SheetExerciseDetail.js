import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { useState } from "react";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { COLOR } from '../constant';
import HeartButton from './HeartButton';

import { toEquipmentName, toLevelName, toMuscleGroupName, toWorkoutTypeName } from "../backendRules";
import {toggleExerciseLike} from '../serverAPIs/favoriteAPI'

export default function SheetExerciseDetail(props) {

    const { bottomSheetRef, exerciseDetail, isLiked, onLikePress } = props;
    // const [isLiked, setLiked] = useState(exerciseDetail?.liked);
    console.log("exercise drtail,===", exerciseDetail)
    console.log("isliked===",isLiked)
    //render sheet
    const renderContent = (exerciseDetail) => {
        return (
            <View style={styles.wrapper}>

                {/* exercise video */}
                <Video
                    style={styles.video}
                    // source={require('../assets/video/InclinePushUps.mp4')}
                    source={exerciseDetail?{uri: exerciseDetail.videoUrl}: require('../assets/video/InclinePushUps.mp4')}
                    repeat
                    resizeMode="cover">
                </Video>

                {/* heart button */}
                <HeartButton style={styles.likeBtn} isliked={isLiked} onButtonPress={() => { 
                    // setLiked(prev => !prev)
                    // console.log("exercis e id====", exerciseDetail)
                    // toggleExerciseLike(exerciseDetail._id)
                    onLikePress()
                }} />

                {/* exercise name */}
                <Text style={styles.exerciseName}>{exerciseDetail?.name}</Text>

                {/* level */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Độ Khó</Text>
                    <View style={styles.groupListItem}>
                        {exerciseDetail?.levels.map((index) => {
                            return (
                                <Text style={styles.groupItem} key={index}>{toLevelName(index)}</Text>
                            )
                        })}
                    </View>
                </View>

                {/* muscle group */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Nhóm cơ tác động</Text>
                    <View style={styles.groupListItem}>
                        {exerciseDetail?.muscleGroups.map((index) => {
                            return (
                                <Text style={styles.groupItem} key={index}>{toMuscleGroupName(index)}</Text>
                            )
                        })}
                    </View>
                </View>

                {/* equipment */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Dụng cụ tập</Text>
                    <View style={styles.groupListItem}>
                        {exerciseDetail?.equipments.length > 0 ? exerciseDetail.equipments.map((index) => {
                            return (
                                <Text style={styles.groupItem} key={index}>{toEquipmentName(index)}</Text>
                            )
                        } ): (<Text style={styles.groupItem}>Không có dụng cụ </Text>)}
                    </View>
                </View>
            </View>
        )
    }



    //render sheet header
    const renderHeader = () => (
        <View style={styles.HeaderWrapper}>
            <View style={styles.HeaderIcon}></View>
        </View>
    )
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['95%', 0]}
            borderRadius={10}
            initialSnap={1}
            renderContent={() => renderContent(exerciseDetail)}
            index={props.index}
            renderHeader={renderHeader}>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    HeaderWrapper: {
        backgroundColor: 'black',
        alignItems: "center",
        height: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    HeaderIcon: {
        marginTop: 10,
        borderWidth: 2,
        width: 50,
        borderRadius: 40,
        borderColor: 'white',
    },

    likeBtn: {
        position: "absolute",
        top: 180,
        right: '10%',
    },

    wrapper: {
        backgroundColor: COLOR.MATTE_BLACK,
        height: '100%',
    },

    video: {
        width: '100%',
        height: 200,
        marginTop: 5,
        borderRadius: 0,
    },
    exerciseName: {
        marginTop: 20,
        paddingHorizontal: 30,
        fontSize: 24,
        fontWeight: "bold",
        color: 'white'
    },
    groupWrapper: {
        paddingHorizontal: 30,
        marginTop: 10,
    },
    groupTitle: {
        fontWeight: "bold",
        color: COLOR.LIGHT_GREY,
        fontSize: 16,
        marginBottom: 10,
    },
    groupListItem: {
        flexDirection: "row",
    },
    groupItem: {
        marginRight: 5,
        backgroundColor: COLOR.LIGHT_BROWN,
        padding: 5,
        borderRadius: 8,
        color: 'white',
        fontWeight: "bold",
    },
});