import React from "react";
import { View, Text,Image } from 'react-native';
import AppLogo from "../assets/images/AppLogo.png";

function SplashScreen(props) {

    //check if user had signed in or not from AsyncStorage
    const checkSignedIn = new Promise((resolve) => {
        setTimeout(() => {
            resolve(0);
        }, 2000)
    })
    
    checkSignedIn
        .then((isSignedIn) => {
            if(isSignedIn)
                props.navigation.navigate('Tab');
            else
                props.navigation.navigate('First');

        })
        .catch(() => {
            console.log(' splash error');
        })


    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#222222'}}>
            <Image source={AppLogo} />   
        </View>
    )
};

export default SplashScreen;