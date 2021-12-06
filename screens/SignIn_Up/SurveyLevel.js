import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { SCREEN_WIDTH, COLOR } from '../../constant.js';
import { Icon } from 'react-native-elements';

export default function SurveyLevel() {

    //data for flatlist
    const levels = [
        {
            index: 1,
            title: 'Người Mới 👶',
            desc: 'Chưa từng tập luyện trước đây',
        },
        {
            index: 2,
            title: 'Trung Bình 😤',
            desc: 'Đã tập luyện được một thời gian',
        },
        {
            index: 3,
            title: 'Nâng Cao 💪😈',
            desc: 'Rất có kinh nghiệm trong tập luyện',
        },
    ];

    //state for an array of selected item
    const [isSelected, SetSelected] = useState();

    //render levels list
    const renderListItems = ({ item }) => {

        const borderColor = isSelected === item.index ? COLOR.LIGHT_BROWN : 'grey';
        const opacity = isSelected === item.index ? 1 : 0;

        return (
            <TouchableOpacity
                onPress={() => SetSelected(item.index)}
                style={[styles.itemWrapper, { borderColor }]}
            >
                <View style={styles.itemLeft}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <Icon style={[ styles.iconItemSelected, {opacity} ]} name="done" type="material" size={22} color="white"></Icon>
            </TouchableOpacity>
        )
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trình Độ Hiện Tại</Text>
            <FlatList
                style={styles.listItem}
                data={levels}
                renderItem={renderListItems}
                keyExtractor={item => item.title}>
            </FlatList>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 22,
        marginBottom: 30,
    },
    listItem: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
    },
    itemWrapper: {
        padding: 20,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 8,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        height: 110,
    },
    itemLeft: {
        flex: 1,
        height: '90%',
    },
    iconItemSelected: {
        backgroundColor: COLOR.LIGHT_BROWN,
        padding: 4,
        borderRadius: 40,
        marginLeft: 5, 

    },
    itemTitle: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 18,
    },
    itemDesc: {
        color: '#999',
        fontSize: 14,
        marginTop: 5,
    },
});