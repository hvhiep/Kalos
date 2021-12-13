import React, { useState } from "react";
import { View, Text, Image, StatusBar } from 'react-native';
import AppLogo from "../assets/images/AppLogo.png";
import { getUserToken } from '../AsyncStorage/userStorage';

function SplashScreen({ route, navigation }) {
    console.log('SPLASH re-render');
    //Tạm thời comment lại để code sign in và sign up
    // const waitAMoment = async () => {
    //     await setTimeout(() => {
    //         props.navigation.navigate('First');
    //     }, 3000);
    // }
    // waitAMoment();
   

    //check login
    const checkLogin = async () => {
        try {
            //get userToken
            const userToken = await getUserToken();
            console.log('SPLASH - user token: ', typeof userToken);
            if (userToken === -1 || userToken === '' || userToken === undefined || userToken === null) {
                //if async store hasnt saved token, navigate to First Screen for SignIn or SignUp
                navigation.navigate('First');
            }
            else {
                //else navigate to Home screen
                navigation.navigate('Tab');
            }

        } catch (error) {
            console.log(error);
        }
    }
    if (route?.params !== undefined)
        checkLogin();
    checkLogin();



    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#222222' }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={'transparent'}
                translucent></StatusBar>
            <Image source={AppLogo} />
        </View>
    )
};

export default SplashScreen;