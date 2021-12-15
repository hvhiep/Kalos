import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { COLOR } from '../constant';
import { useState } from "react";


function SheetFilter({ sheetFilterRef, initialSnap, onSubmit }, ref) {

    //tags: level, muscleGroup, equipment
    const levels = [
        'Tất Cả',
        'Người Mới',
        'Trung Bình',
        'Nâng Cao'
    ];
    const muscleGroups = [
        'Toàn Thân',
        'Lưng',
        'Bắp Tay Trước',
        'Ngực',
        'Bắp Tay Sau',
        'Vai',
        'Bụng',
        'Chân',
    ];
    const equipments = [
        'Không Dụng Cụ',
        'Có Dụng Cụ',
    ];
    //state cho việc nhấn vào từng item
    // -1 === unselect
    const [selectedLevel, setSelectedLevel] = useState(-1);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(-1);
    const [selectedEquipment, setSelectedEquipment] = useState(-1);
    console.log(selectedLevel, selectedMuscleGroup, selectedEquipment);

    useImperativeHandle(ref, () => ({
        //parent component (ExerciseScreen) uses this functions for unselecting through ref
        setLevel() {
            setSelectedLevel(-1);
        },
        setMuscleGroup() {
            setSelectedMuscleGroup(-1);
        },
        setEquipment() {
            setSelectedEquipment(-1);
        },
    }))


    //handle press function: highlight item khi nhấn vào item
    const handleLevelPress = (index) => {
        if (selectedLevel !== index)
            setSelectedLevel(index);
        else
            //else set selected item to -1 for removing
            setSelectedLevel(-1);
    }
    const handleMuscleGroupPress = (index) => {
        if (selectedMuscleGroup !== index)
            setSelectedMuscleGroup(index);
        else
            setSelectedMuscleGroup(-1);
    }
    const handleEquipmentPress = (index) => {
        if (selectedEquipment !== index)
            setSelectedEquipment(index);
        else
            setSelectedEquipment(-1);
    }

    //handle apply fitler: lấy dữ liệu đã chọn -> đóng bottom sheet và gửi dữ liệu về component cha
    const handleApplyFilter = () => {
        //prepare data 
        let data = [
            {
                title: 'level',
                value: selectedLevel,
            },
            {
                title: 'muscleGroup',
                value: selectedMuscleGroup,
            },
            {
                title: 'equipment',
                value: selectedEquipment,
            }
        ];
        onSubmit(data);

        //close sheet
        sheetFilterRef.current.snapTo(0);
    }

    //render nội dung bên trong bottom sheet
    const renderContent = () => (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Lọc Bài Tập</Text>
            <ScrollView style={styles.bodyWrapper}>

                {/* level */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Độ Khó</Text>
                    <View style={styles.groupListItem}>
                        {levels.map((item, index) => {

                            //kiểm tra level item có phải là selectedLevel hay không?
                            const bgColor = index === selectedLevel ? COLOR.LIGHT_BROWN : COLOR.LIGHT_GREY;
                            const fontColor = index === selectedLevel ? 'white' : 'black';

                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.groupItem, { backgroundColor: bgColor }]}
                                    onPress={() => handleLevelPress(index)}>
                                    <Text style={[styles.groupItemText, { color: fontColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                {/* muscleGroup */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Nhóm Cơ</Text>
                    <View style={styles.groupListItem}>
                        {muscleGroups.map((item, index) => {

                            //kiểm tra level item có phải là selectedLevel hay không?
                            const bgColor = index === selectedMuscleGroup ? COLOR.LIGHT_BROWN : COLOR.LIGHT_GREY;
                            const fontColor = index === selectedMuscleGroup ? 'white' : 'black';

                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.groupItem, { backgroundColor: bgColor }]}
                                    onPress={() => handleMuscleGroupPress(index)}>
                                    <Text style={[styles.groupItemText, { color: fontColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                {/* equipment */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Dụng Cụ</Text>
                    <View style={styles.groupListItem}>
                        {equipments.map((item, index) => {

                            //kiểm tra level item có phải là selectedLevel hay không?
                            const bgColor = index === selectedEquipment ? COLOR.LIGHT_BROWN : COLOR.LIGHT_GREY;
                            const fontColor = index === selectedEquipment ? 'white' : 'black';

                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.groupItem, { backgroundColor: bgColor }]}
                                    onPress={() => handleEquipmentPress(index)}>
                                    <Text style={[styles.groupItemText, { color: fontColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                {/* apply filter button */}
                <TouchableOpacity
                    style={styles.applyFilter}
                    onPress={handleApplyFilter}>
                    <Text style={styles.applyFilterText}>Áp Dụng</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

    //render header của bottom sheet
    const renderHeader = () => (
        <View style={styles.HeaderWrapper}>
            <View style={styles.HeaderIcon}></View>
        </View>
    )

    //bottom sheet
    return (
        <BottomSheet
            ref={sheetFilterRef}
            snapPoints={[0, '100%']}
            initialSnap={initialSnap}
            renderContent={renderContent}
            renderHeader={renderHeader}
            enabledInnerScrolling
            enabledContentGestureInteraction={false}>
        </BottomSheet>

    )
};
export default forwardRef(SheetFilter);

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
    wrapper: {
        backgroundColor: COLOR.MATTE_BLACK,
        height: '100%',
        paddingBottom: 100,
    },
    title: {
        alignSelf: "center",
        marginVertical: 10,
        color: 'white',
        fontWeight: "bold",
        fontSize: 20,
    },
    groupWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    groupTitle: {
        fontWeight: "bold",
        color: COLOR.LIGHT_GREY,
        fontSize: 18,
        marginBottom: 10,
    },
    groupListItem: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        width: '100%',
    },
    groupItem: {
        margin: 8,
        backgroundColor: COLOR.LIGHT_GREY,
        padding: 15,
        borderRadius: 8,
        width: '45%',
        alignItems: "center",
    },
    groupItemText: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 16,
    },
    applyFilter: {
        backgroundColor: COLOR.ORANGE,
        marginHorizontal: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        marginTop: 16,
        marginBottom: 10,
    },
    applyFilterText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
});