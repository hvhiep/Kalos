import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import { SCREEN_WIDTH, COLOR } from '../../constant.js';
import { ScrollView } from "react-native-gesture-handler";

function SurveyPerformance(props, ref) {

    //data
    const performancesArray = [
        {
            title: 'Hít Đất',
        },
        {
            title: 'Kéo Xà',
        },
        {
            title: 'Squats',
        },
        {
            title: 'Dips',
        },
    ];
    //each performance object {title, reps}
    const [performance, setPerformance] = useState();
    //array of performance
    const [performances, setPerformances] = useState({});

    //return data to parent component through ref
    useImperativeHandle(ref, () => ({
        getPerformance() {
            return performances;
        },
    }))

    const handleInputBlur = (e, index) => {
        switch (index) {
            case 0:
                setPerformances({ ...performances, pushUp: performance });
                break;
            case 1:
                setPerformances({ ...performances, pullUp: performance });
                break;
            case 2:
                setPerformances({ ...performances, squats: performance });
                break;
            case 3:
                setPerformances({ ...performances, dips: performance });
                break;
            default: throw new Error('Lỗi khi thêm performance!');
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Số Reps Tối Đa:</Text>
            {/* render item from data array */}
            {
                performancesArray.map((item, index) => {
                    return (
                        <View key={item.title} style={styles.wrapper}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="decimal-pad"
                                onChangeText={(text) => setPerformance(parseInt(text))}
                                onBlur={e => handleInputBlur(e, index)}
                            >
                            </TextInput>
                        </View>
                    )
                })
            }

        </ScrollView>
    )
};
export default forwardRef(SurveyPerformance);

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
        width: SCREEN_WIDTH / 2,
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