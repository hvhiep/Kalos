import React, { useState, forwardRef, useImperativeHandle } from "react";
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

function SurveyWeight(props, ref) {
    const [weight, setWeight] = useState();
    //return data to parent component through ref
    useImperativeHandle( ref, () => ({
        getWeight () {
            return weight;
        },
    }))

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cân Nặng Hiện Tại:</Text>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.weightInput}
                    onChangeText={(text) => setWeight(parseInt(text))}
                    keyboardType="decimal-pad">
                </TextInput>
                <Text style={styles.unitText}>KG</Text>
            </View>
        </View>
    )
};
export default forwardRef(SurveyWeight);
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
    wrapper: {
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    unitText: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 30,
        marginLeft: 10,
    },
    weightInput: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: SCREEN_WIDTH / 4,
        textAlign: "center",
    },
});