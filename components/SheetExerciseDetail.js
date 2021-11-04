import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import Video from 'react-native-video';
import { useState } from "react";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { COLOR } from '../constant';
import HeartButton from './HeartButton';


export default function SheetExerciseDetail(props) {

    const { bottomSheetRef, exerciseDetail } = props;
    const [liked, setLiked] = useState(true);

    //render sheet
    const renderContent = (exerciseDetail) => {
        return (
            <View style={styles.wrapper}>

                {/* exercise video */}
                <Video
                    style={styles.video}
                    source={require('../assets/video/InclinePushUps.mp4')}
                    repeat
                    resizeMode="cover">
                </Video>

                {/* heart button */}
                <HeartButton style={styles.likeBtn} isliked={liked} onButtonPress={() => { liked ? setLiked(false) : setLiked(true) }} />

                {/* exercise name */}
                <Text style={styles.exerciseName}>{exerciseDetail?.exercise}</Text>

                {/* level */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Độ Khó</Text>
                    <View style={styles.groupListItem}>
                        {exerciseDetail?.level.map((levelName, index) => {
                            return (
                                <Text style={styles.groupItem} key={index}>{levelName}</Text>
                            )
                        })}
                    </View>
                </View>

                {/* muscle group */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Nhóm cơ tác động</Text>
                    <View style={styles.groupListItem}>
                        {exerciseDetail?.muscleGroup.map((muscleGroupName, index) => {
                            return (
                                <Text style={styles.groupItem} key={index}>{muscleGroupName}</Text>
                            )
                        })}
                    </View>
                </View>

                {/* equipment */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Dụng cụ tập</Text>
                    <View style={styles.groupListItem}>
                        {exerciseDetail?.equipment.map((equipmentName, index) => {
                            return (
                                <Text style={styles.groupItem} key={index}>{equipmentName === '' ? 'Không Dụng Cụ' : equipmentName}</Text>
                            )
                        })}
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
            renderContent={() => renderContent(exerciseDetail, liked)}
            renderHeader={renderHeader}>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    HeaderWrapper: {
        backgroundColor: 'white',
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
    },

    likeBtn: {
        position: "absolute",
        top: 180,
        right: '10%',
    },

    wrapper: {
        backgroundColor: 'white',
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
    },
    groupWrapper: {
        paddingHorizontal: 30,
        marginTop: 10,
    },
    groupTitle: {
        fontWeight: "bold",
        color: 'grey',
        fontSize: 16,
        marginBottom: 10,
    },
    groupListItem: {
        flexDirection: "row",
    },
    groupItem: {
        marginRight: 5,
        backgroundColor: COLOR.MATTE_BLACK,
        padding: 5,
        borderRadius: 8,
        color: 'white',
        fontWeight: "bold",
    },
});