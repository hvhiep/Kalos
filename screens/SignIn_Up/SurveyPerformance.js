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
import { ScrollView } from "react-native-gesture-handler";

export default function SurveyPerformance() {

    //data
    const performances = [
        {
            index: 1,
            title: 'Hít Đất',
        },
        {
            index: 2,
            title: 'Kéo Xà',
        },
        {
            index: 3,
            title: 'Squats',
        },
        {
            index: 4,
            title: 'Dips',
        },
    ];

    return (

        <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Số Reps Tối Đa:</Text>
            {/* render item from data array */}
            {
                performances.map((item) => {
                    return (
                        <View key={item.index} style={styles.wrapper}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="decimal-pad">
                            </TextInput>
                        </View>
                    )
                })
            }

        </ScrollView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
    },
    scrollView: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    title: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 22,
        marginBottom: 20,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "flex-end",
        width: SCREEN_WIDTH/2,
        justifyContent: "center",
        marginVertical: 10,
    },
    itemTitle: {
        color: 'white',
        fontSize: 20,
        width: '50%',
    },
    input: {
        color: 'white',
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        textAlign: "center",
        width: '30%',
    },
});