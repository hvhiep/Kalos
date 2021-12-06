import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import { SCREEN_WIDTH, COLOR } from '../../constant.js';
import { Icon } from 'react-native-elements';

export default function SurveyGender() {

    const genders = [
        {
            index: 1,
            gender: 'male',
        },
        {
            index: 2,
            gender: 'female',
        },
    ];
    //gender box selected
    const [isSelected, setSelected] = useState(1);

    //render gender box
    const GenderBox = (props) => {

        const borderColor = props.selected === true ? COLOR.LIGHT_BROWN : 'grey';

        return (
            <TouchableOpacity
                onPress={props.onPress}
                style={[styles.genderBox, {borderColor}]}>
                <Icon
                    name={`${props.gender}-outline`}
                    type="ionicon"
                    size={60}
                    color="white"></Icon>
                <Text style={styles.genderBoxText}>
                    {props.gender === 'male' ? 'Nam' : 'Nữ'}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giới Tính</Text>
            <View style={styles.contentWrapper}>
                {
                    genders.map((item) => {
                        return (
                            <GenderBox
                                key={item.index}
                                gender={item.gender}
                                selected={item.index === isSelected}
                                onPress={() => setSelected(item.index)}>
                            </GenderBox>
                                    
                        )
                    })
                }
            </View>
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
    contentWrapper: {
        flexDirection: "row",
        width: '100%',
        marginHorizontal: 20,
        justifyContent: "center",
    },
    genderBox: {
        padding: 20,
        paddingHorizontal: 35,
        borderWidth: 3,
        borderColor: 'grey',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    genderBoxText: {
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
    },
});