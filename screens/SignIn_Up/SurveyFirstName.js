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

function SurveyFirstName(props, ref) {

    const [name, setName] = useState('');

    //SurveyFirstName component index = 1
    if (props.pageIndex === 1)
        //call callback function with name
        props.name(name);

    useImperativeHandle(ref, () => ({
        getName() {
            return name;
        },
    }))

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tên Của Bạn:</Text>
            <TextInput 
                style={styles.nameInput}
                onChangeText={(text) => setName(text)}></TextInput>
        </View>
    )
};

export default forwardRef(SurveyFirstName);

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
    nameInput: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: SCREEN_WIDTH/2 + 40,
        textAlign: "center",
    },
});