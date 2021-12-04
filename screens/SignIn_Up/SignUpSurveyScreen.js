import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Animated,
    StatusBar
} from 'react-native';
import { SCREEN_WIDTH, COLOR } from '../../constant.js';
import SmallAppLogo from '../../assets/images/SmallAppLogo.png';
import { Icon } from 'react-native-elements';

//survey screen
import SurveyGender from "./SurveyGender.js";
import SurveyFirstName from "./SurveyFirstName.js";
import SurveyWeight from "./SurveyWeight.js";
import SurveyHeight from "./SurveyHeight.js";
import SurveyLevel from "./SurveyLevel.js";
import SurveyGoals from "./SurveyGoals.js";
import SurveyPerformance from "./SurveyPerformance.js";

export default function SignUpSurveyScreen(props) {

    /*
    array of component display order:
    1. gender 
    2.first name 
    3. weight - 4. height 
    5. level 
    6. goals 
    7. performance
    order array is created for page indicator to use map function to render UI only
    */
    const order = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
    ];

    //save x offset of Scroll View
    const scrollX = useRef(0);
    //handle scroll view
    const scrollViewRef = useRef(null);
    const [indicatorSelected, setIndicatorSelected] = useState(0);


    //go back
    const handleToPreviousPage = () => {
        let currentPageIndex = Math.round(scrollX.current / SCREEN_WIDTH);
        //move to previous page
        if (scrollViewRef != null && currentPageIndex > 0) {
            scrollViewRef.current.scrollTo({ x: SCREEN_WIDTH * (currentPageIndex - 1), y: 0, animated: true });
            setIndicatorSelected(currentPageIndex - 1);
        }
        //if this is first page then go back to FirstScreen
        else {
            props.navigation.navigate('First');
        }
    }

    //go next
    const handleToNextPage = () => {
        let currentPageIndex = Math.round(scrollX.current / SCREEN_WIDTH);
        //move to next page
        if (scrollViewRef != null && currentPageIndex < order.length - 1) {
            scrollViewRef.current.scrollTo({ x: SCREEN_WIDTH * (currentPageIndex + 1), y: 0, animated: true });
            setIndicatorSelected(currentPageIndex + 1);
        }
        //if this is last page then go next to SignUpScreen
        else {
            props.navigation.navigate('SignUp');
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={'transparent'}
                translucent></StatusBar>
            {/* header */}
            <View style={styles.headerWrapper}>
                {/* back button */}
                <TouchableOpacity onPress={handleToPreviousPage} style={styles.btnBack}>
                    <Icon
                        name="arrow-back"
                        type="material"
                        size={22}
                        color="white"
                    >
                    </Icon>
                </TouchableOpacity>

                {/* indicator */}
                <View style={styles.indicatorWrapper}>
                    {
                        order.map((item, index) => {
                            //indicator gets brown color when its index is smaller than current selected indicator (like a progress bar)
                            const backgroundColor = index <= indicatorSelected ? COLOR.LIGHT_BROWN : 'white';
                            
                            //style for left and last right indicator
                            let mainStyle = styles.indicator;
                            if (index === 0)
                            mainStyle = styles.leftBorderIndicator;
                            if (index === order.length - 1)
                                mainStyle = styles.rightBorderIndicator;

                            return (
                                <Animated.View key={index} style={[mainStyle, { backgroundColor }]}></Animated.View>
                            )
                        })
                    }
                </View>
                <View style={{ width: 62 }}></View>

            </View>

            {/* new user survey */}
            <ScrollView
                style={styles.contentWrapper}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => { scrollX.current = event.nativeEvent.contentOffset.x }}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            >
                <SurveyGender></SurveyGender>
                <SurveyFirstName></SurveyFirstName>
                <SurveyWeight></SurveyWeight>
                <SurveyHeight></SurveyHeight>
                <SurveyLevel></SurveyLevel>
                <SurveyGoals></SurveyGoals>
                <SurveyPerformance></SurveyPerformance>
            </ScrollView>

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
        backgroundColor: COLOR.MATTE_BLACK,
    },
    headerWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        marginTop: StatusBar.currentHeight,
    },
    btnBack: {
        padding: 5,
        borderRadius: 40,
        margin: 10,
    },
    indicatorWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        width: 30,
        height: 5,
    },
    leftBorderIndicator: {
        width: 30,
        height: 5,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    rightBorderIndicator: {
        width: 30,
        height: 5,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    contentWrapper: {

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
        marginTop: 40,
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
});