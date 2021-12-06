import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { COLOR } from '../constant';

export default function BodyIndexPopup({ isShow, changeModalVisible, setData, title, bodyIndexCurrent }) {

    const [bodyIndex, setBodyIndex] = useState(bodyIndexCurrent);

    const closeModal = (type, data) => {
        changeModalVisible();
        setData(type, data);
    }

    return (
        <Modal
            visible={isShow}
            transparent={true}>
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cập Nhật {title}</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setBodyIndex(text)}
                            defaultValue={`${bodyIndexCurrent}`}
                            keyboardType='decimal-pad'>
                        </TextInput>
                        <Text style={styles.inputUnit}>
                            {((title === 'Cân Nặng' && 'KG') || (title === 'Chiều Cao' && 'CM' || ''))}
                        </Text>
                    </View>

                    {/* handle button: save or not */}
                    <View style={styles.buttonWrapper}>
                        {/* 1: save || 0: cancel */}
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={() => closeModal(0, bodyIndex)}>
                            <Text style={styles.buttonCancelText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSave}
                            onPress={() => closeModal(1, bodyIndex)}>
                            <Text style={styles.buttonSaveText}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: '#333',
        width: '70%',
        borderRadius: 8
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: "center",
        marginTop: 10,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: "center",
        
    },
    input: {
        color: 'white',
        borderBottomWidth: 2,
        borderColor: 'white',
        fontSize: 24,
        marginHorizontal: 20,
        width: '30%',
    },
    inputUnit: {
        color: 'white',
        fontSize: 24,
    },
    buttonWrapper: {
        margin: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonSave: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: COLOR.LIGHT_BROWN,
    },
    buttonCancel: {
        padding: 10,
    },
    buttonSaveText: {
        color: 'white',

    },
    buttonCancelText: {
        color: 'white',

    },
});