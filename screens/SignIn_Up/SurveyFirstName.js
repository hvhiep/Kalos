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

export default function SurveyFirstName() {

    const [name, setName] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tên Của Bạn:</Text>
            <TextInput 
                style={styles.nameInput}
                onChangeText={(text) => setName(text)}></TextInput>
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