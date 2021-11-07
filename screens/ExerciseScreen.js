import React from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import exercisesData from "../assets/testData/exercisesData";
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
import { COLOR } from '../constant';
import { SearchBar } from "react-native-elements";

function ExerciseScreen() {

    //render exercise item
    const renderExerciseItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.exerciseWrapper}>
                <View style={styles.exerciseLeftWrapper}>
                    <Image
                        style={styles.exerciseImage}
                        source={require('../assets/images/InclinePushUps.png')}
                    ></Image>
                </View>
                <View style={styles.exerciseRightWrapper}>
                    <Text 
                        style={styles.exerciseName}
                        numberOfLines={2}>{item.exercise}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tất Cả Bài Tập</Text>
            <View style={styles.searchWrapper}>
                <SearchBar
                    containerStyle={styles.search}
                    inputStyle={styles.searchInput}
                    placeholder="Tìm Kiếm"
                    inputContainerStyle={styles.searchInput}
                    platform="android"
                />
                <TouchableOpacity style={styles.searchFilter}>
                    <Icon
                        name="filter-alt"
                        type="material"
                        size={22}></Icon>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.ListExercise}
                data={exercisesData}
                renderItem={renderExerciseItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    title: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
    },
    search: {
        flex: 1,
        borderRadius: 20,
        marginRight: 10,
    },
    searchInput: {
        height: 20,

    },
    searchFilter: {

    },
    ListExercise: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    exerciseWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        height: 80,
    },
    exerciseLeftWrapper: {
    },
    exerciseRightWrapper: {
        flex: 1,
    },
    exerciseImage: {
        resizeMode: "center",
        height: 80,
        width: 100,
        borderRadius: 30,
        
    },
    exerciseName: {
        marginLeft: 20,
        marginRight: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ExerciseScreen;