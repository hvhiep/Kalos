import React from "react";
import { View, Text,Image } from 'react-native';
import AppLogo from "../assets/images/AppLogo.png";
import { getUserToken } from '../AsyncStorage/userStorage';

function SplashScreen(props) {

    //Tạm thời comment lại để code sign in và sign up
    const waitAMoment = async () => {
        await setTimeout(() => {
            props.navigation.navigate('First');
        }, 3000);
    }
    waitAMoment();

    //check login
    // const checkLogin = async () => {
    //     //get userToken
    //     const userToken = await getUserToken();
    //     if(userToken !== -1)
    //     {
    //         //if async store has saved token, navigate to Home screen
    //         //console.log('SPLASH SCREEN - user token: ', userToken);
    //         props.navigation.navigate('Tab');
    //     }  
    //     else
    //         //else navigate to First Screen for SignIn or SignUp
    //         props.navigation.navigate('First');
            
    // }
    // checkLogin();



    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#222222'}}>
            <Image source={AppLogo} />   
        </View>
    )
};

export default SplashScreen;