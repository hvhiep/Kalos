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

export default function SurveyGoals() {

    //data for flatlist
    const goals = [
        {
            index: 1,
            title: 'Xây Dựng Sức Mạnh 👊',
            desc: 'Trở nên mạnh mẽ hơn và dễ dàng làm chủ bài tập',
        },
        {
            index: 2,
            title: 'Xây Dựng Cơ Bắp 💪',
            desc: 'Tăng khối lượng và độ khó bài tập để phát triển cơ bắp',
        },
        {
            index: 3,
            title: 'Giảm Mỡ 🏃',
            desc: 'Tối ưu hóa cho các bài tập đốt mỡ',
        },
        {
            index: 4,
            title: 'Học Kỹ Năng 🤸🏼‍♀️',
            desc: 'Thuần thục nhiều kĩ năng điêu luyện',
        },
    ];

    //state for an array of selected item
    const [isSelected, SetSelected] = useState([]);

    //handle multi item click (checkbox)
    const handleSelectedItem = (item) => {
        //if item is not in the array, insert into array else remove from array
        if (!isSelected.includes(item.index))
            SetSelected([...isSelected, item.index]);
        else
            SetSelected(isSelected.filter(index => index != item.index));
    };

    //render goals list
    const renderListItems = ({ item }) => {

        //highlight selected item 
        const borderColor = isSelected.includes(item.index) ? COLOR.LIGHT_BROWN : 'grey';
        const opacity = isSelected.includes(item.index) ? 1 : 0;

        return (
            <TouchableOpacity
                onPress={() => handleSelectedItem(item)}
                style={[styles.itemWrapper, { borderColor }]}
            >
                <View style={styles.itemLeft}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <Icon style={[styles.iconItemSelected, { opacity }]} name="done" type="material" size={22} color="white"></Icon>
            </TouchableOpacity>
        )
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mục Tiêu</Text>
            <FlatList
                style={styles.listItem}
                data={goals}
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