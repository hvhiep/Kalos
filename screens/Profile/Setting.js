import React from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { COLOR } from '../../constant';

export default function Setting() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}></Text>
            </View>
            
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: COLOR.MATTE_BLACK,
        
    },
    view: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
});