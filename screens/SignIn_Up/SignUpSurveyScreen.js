import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Animated
} from 'react-native';
import { SCREEN_WIDTH, COLOR } from '../../constant.js';
import SmallAppLogo from '../../assets/images/SmallAppLogo.png';
import { Icon } from 'react-native-elements';


//example code: https://www.youtube.com/watch?v=FWtZgcASlkU

export default function SignUpSurveyScreen(props) {

    /*
    array of component display order:
    1. gender - 2.first name - 2. weight - 3. height - 4. level - 5. goals - 6. performance

    order array is created for page indicator to use map function 
    */
    const order = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
    ];

    //save x offset of Scroll View
    const scrollX = useRef(0);
    //handle scroll view
    const scrollViewRef = useRef(null);
    const [indicatorSelected, setIndicatorSelected] = useState(0);

    //back button
    const handleToPreviousPage = () => {
        let currentPageIndex = Math.floor(scrollX.current/SCREEN_WIDTH);
        //move to previous page
        if(scrollViewRef != null && currentPageIndex > 0)
        {
            scrollViewRef.current.scrollTo({x: SCREEN_WIDTH*(currentPageIndex - 1), y: 0, animated: true});
            setIndicatorSelected(currentPageIndex - 1);
        }
        //if this is first page then go back to FirstScreen
        else{
            props.navigation.navigate('First');
        }
    }

    //next button
    const handleToNextPage = () => {
        let currentPageIndex = Math.floor(scrollX.current/SCREEN_WIDTH);
        //move to next page
        if(scrollViewRef != null && currentPageIndex < order.length - 1){
            scrollViewRef.current.scrollTo({x: SCREEN_WIDTH*(currentPageIndex + 1), y: 0, animated: true});
            setIndicatorSelected(currentPageIndex + 1);
        }
        //if this is last page then go next to SignUpScreen
        else{
            props.navigation.navigate('SignUp');
        }
            
    }

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={handleToPreviousPage} style={styles.btnBack}>
                    <Icon
                        name="arrow-back"
                        type="material"
                        size={16}
                    >
                    </Icon>
                </TouchableOpacity>
            </View>

            {/* new user survey */}
            <ScrollView
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {scrollX.current = event.nativeEvent.contentOffset.x}}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            >
                <View style={styles.page1}><Text>page 1</Text></View>
                <View style={styles.page2}><Text>page 2</Text></View>
                <View style={styles.page2}><Text>page 3</Text></View>
                <View style={styles.page2}><Text>page 4</Text></View>
                <View style={styles.page2}><Text>page 5</Text></View>
            </ScrollView>
            <View style={styles.indicatorWrapper}>
                {
                    order.map((item, index) => {
                        const backgroundColor = index === indicatorSelected ? 'green' : 'red';
                        return (
                            <Animated.View key={index} style={[styles.normalDots, {backgroundColor}]}></Animated.View>
                        )
                    })
                }
            </View>

            {/* btnNext */}
            <TouchableOpacity onPress={handleToNextPage} style={styles.btnNext}>
                <Text style={styles.btnNextText}>Tiếp Theo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page1: {
        flex: 1,
        width: SCREEN_WIDTH,
        backgroundColor: 'red',
    },
    page2: {
        flex: 1,
        width: SCREEN_WIDTH,
        backgroundColor: 'yellow',
    },
    btnNext: {
        alignSelf: "center",
        width: '90%',
        backgroundColor: COLOR.LIGHT_BROWN,
        marginTop: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginBottom: 30,
    },
    btnNextText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
    indicatorWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    normalDots: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: 'red',
    },
});