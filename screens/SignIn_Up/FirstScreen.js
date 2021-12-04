import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT, COLOR } from '../../constant.js';
import Video from 'react-native-video';
import LinearGradient from "react-native-linear-gradient";
import Intro from '../../assets/video/Intro.mp4';

export default function FirstScreen(props) {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={'transparent'}
                translucent></StatusBar>
            {/* video */}
            <Video
                style={styles.bgVideo}
                // source={require('../../assets/video/InclinePushUps.mp4')}
                source={Intro}
                repeat
                resizeMode="cover">
            </Video>
            <LinearGradient
                style={styles.bgLinearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.9 }}
                colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}></LinearGradient>
            <Text style={styles.title}>Ở nhà mà vẫn muốn có cơ bắp cuồn cuộn ?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('SignUpSurvey')} style={styles.btnSignUp}>
                <Text style={styles.signUpText}>Đăng Ký Ngay</Text>
            </TouchableOpacity>
            <View style={styles.signInWrapper}>
                <Text style={styles.signInTitle}>Đã có tài khoản?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')} style={styles.btnSignIn}>
                    <Text style={styles.signIpText}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.MATTE_BLACK,
        alignItems: "center",
        justifyContent: "flex-end",

    },
    bgVideo: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    bgLinearGradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        bottom: 0,
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: "center",
        marginHorizontal: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    btnSignUp: {
        width: '90%',
        backgroundColor: COLOR.LIGHT_BROWN,
        marginHorizontal: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 16,
        marginBottom: 10,
    },
    signUpText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
    signInWrapper: {
        width: '90%',
        flexDirection: "row",
        opacity: 0.6,
        marginBottom: 60,
        justifyContent: "center",
        marginTop: 10,
    },
    signInTitle: {
        color: 'white',
        marginRight: 10,
    },
    btnSignIn: {
    },
    signIpText: {
        color: 'white',
        fontWeight: "bold",
    },

});