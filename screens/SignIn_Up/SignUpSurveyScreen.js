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
    const GENDER = 0;
    const NAME = 1;
    const WEIGHT = 2;
    const HEIGHT = 3;
    const LEVEL = 4;
    const GOALS = 5;
    const PERFORMANCE = 6;

    const order = [
        { num: 0 },
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
    ];

    //save x offset of Scroll View
    const scrollX = useRef(0);
    const scrollViewRef = useRef(null);
    const genderRef = useRef();
    const nameRef = useRef();
    const weightRef = useRef();
    const heightRef = useRef();
    const levelRef = useRef();
    const goalsRef = useRef();
    const performanceRef = useRef();

    //progress bar
    const [indicatorSelected, setIndicatorSelected] = useState(0);
    //save user survey info from 7 surveys (gender, name, weight, ...)
    const [userSurveyInfo, setUserSurveyInfo] = useState({});
    const [isUserSurveyInfoFull, setUserSurveyInfoFull] = useState(0);
    console.log('user info: ', userSurveyInfo);



    //handle top-left back button
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

    //handle next button:
    /*
        Next button does 3 jobs:
        a. save data from current page before go to the next page
        b. calculate current page index to scroll next page
        c. if current page is final page, then go to Sign Up screen
    */
    const handleToNextPage = () => {
        let currentPageIndex = Math.round(scrollX.current / SCREEN_WIDTH);
        //a.
        handleUserInfoSave(currentPageIndex);
        //check current page index and order array length
        if (scrollViewRef != null && currentPageIndex < order.length - 1) {
            //b.
            scrollViewRef.current.scrollTo({ x: SCREEN_WIDTH * (currentPageIndex + 1), y: 0, animated: true });
            //update progress bar
            setIndicatorSelected(currentPageIndex + 1);
        }
        else {
            //c.
            if(isUserSurveyInfoFull)
                props.navigation.navigate('SignUp', userSurveyInfo);
            else
                console.log('k on r');
        }
    }

    //handle user info save
    const handleUserInfoSave = (currentPageIndex) => {

        //add new data with each page
        switch (currentPageIndex) {
            case GENDER:
                setUserSurveyInfo({ ...userSurveyInfo, gender: genderRef.current.getGender() });
                break;
            case NAME:
                setUserSurveyInfo({ ...userSurveyInfo, name: nameRef.current.getName() });
                break;
            case WEIGHT:
                setUserSurveyInfo({ ...userSurveyInfo, weight: weightRef.current.getWeight() });
                break;
            case HEIGHT:
                setUserSurveyInfo({ ...userSurveyInfo, height: heightRef.current.getHeight() });
                break;
            case LEVEL:
                setUserSurveyInfo({ ...userSurveyInfo, level: levelRef.current.getLevel() });
                break;
            case GOALS:
                setUserSurveyInfo({ ...userSurveyInfo, goals: goalsRef.current.getGoals() });
                break;
            case PERFORMANCE:
                setUserSurveyInfo({ ...userSurveyInfo, performance: performanceRef.current.getPerformance() });
                setUserSurveyInfoFull(1);
                break;
            default: throw new Error('Có lỗi khi cập nhật thông tin người dùng mới!');
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
                <SurveyGender ref={genderRef}></SurveyGender>
                <SurveyFirstName ref={nameRef}></SurveyFirstName>
                <SurveyWeight ref={weightRef}></SurveyWeight>
                <SurveyHeight ref={heightRef}></SurveyHeight>
                <SurveyLevel ref={levelRef}></SurveyLevel>
                <SurveyGoals ref={goalsRef}></SurveyGoals>
                <SurveyPerformance ref={performanceRef}></SurveyPerformance>
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