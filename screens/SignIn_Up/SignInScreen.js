import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { STATUSBAR_HEIGHT, COLOR } from '../../constant.js';
import SmallAppLogo from '../../assets/images/SmallAppLogo.png';
import { Icon } from 'react-native-elements';
//userAPI
import { SignInAPI } from "../../serverAPIs/userAPI.js";
import { storeUserToken } from "../../AsyncStorage/userStorage.js";

export default function SignInScreen(props) {

    const [isPasswordVisibility, setPasswordVisibility] = useState(true);
    const [isAPICalling, setAPICalling] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //show error text if submit form with empty input
    const [isInputEmpty, setInputEmpty] = useState(0);
    const [isSignInSuccess, setSignInSuccess] = useState(false);
    const [isSignInError, setSignInError] = useState(false);


    //handle and validate sign in form submit
    const handleSignInSubmit = async () => {
        //1. validation: check empty input
        setAPICalling(true);
        if (username === '' || password === '') {
            setAPICalling(false);
            setInputEmpty(1);
        }
        else {
            //send username + pass to server to get token
            const res = await SignInAPI(username, password);
            if (res !== -1) {
                setAPICalling(false);
                setSignInSuccess(true);
                setSignInError(false);
                //store token in async storage
                const storeResult = await storeUserToken(res.data.token);
                //navigate to home screen if success
                if (storeResult)
                    props.navigation.navigate('Tab');
                else
                    console.log('Có lỗi khi lưu token!');
            }
            else {
                setAPICalling(false);
                setSignInError(true);
                console.log('Có Lỗi Khi Đăng Nhập!')
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={SmallAppLogo}></Image>
            <Text style={styles.title}>Đăng Nhập</Text>

            {/* sign in form */}
            <View style={styles.wrapper}>
                {/* username */}
                <TextInput
                    style={styles.username}
                    placeholder="Tên Đăng Nhập"
                    placeholderTextColor="#888"
                    onChangeText={text => setUsername(text)}
                    //hide error msg when typing
                    onFocus={() => setInputEmpty(0)}
                >
                </TextInput>

                {/* password */}
                <View style={styles.passwordWrapper}>
                    <TextInput
                        style={styles.password}
                        placeholder="Mật Khẩu"
                        placeholderTextColor="#888"
                        secureTextEntry={isPasswordVisibility}
                        onChangeText={text => setPassword(text)}
                        //hide error msg when typing
                        onFocus={() => setInputEmpty(0)}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={() => setPasswordVisibility(!isPasswordVisibility)}>
                        <Icon
                            style={styles.passVisibleIcon}
                            name={isPasswordVisibility ? 'visibility-off' : 'visibility'}
                            type="material"
                            size={22}
                            color="white">
                        </Icon>
                    </TouchableOpacity>
                </View>

                {/* forgot password */}
                <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')} style={styles.forgotPass}>
                    <Text style={styles.forgotPassText}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
                {/* input error */}
                <Text style={[styles.inputError, isInputEmpty === 1 ? { display: 'flex' } : { display: 'none' }]}>Vui lòng điền đầy đủ thông tin!</Text>

                {/* sign in is error */}
                <Text
                    style={[styles.errorText, isSignInError === true ? { display: 'flex' } : { display: 'none' }]}
                >
                    Tài Khoản Hoặc Mật Khẩu sai!
                </Text>
                {/* sign in is success */}
                <Text
                    style={[styles.successText, isSignInSuccess === true ? { display: 'flex' } : { display: 'none' }]}
                >
                    Đăng Nhập Thành Công!
                </Text>

                {/* sign in button */}
                <TouchableOpacity onPress={handleSignInSubmit} style={styles.btnSignIn}>
                    <Text
                        style={[styles.btnSignInText, isAPICalling === false ? { display: 'flex' } : { display: 'none' }]}
                    >
                        Đăng Nhập
                    </Text>
                    <ActivityIndicator
                        style={isAPICalling === true ? { display: 'flex' } : { display: 'none' }}
                        size="small"
                        color='white'
                    >
                    </ActivityIndicator>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.MATTE_BLACK,
    },
    logo: {
        marginTop: 40,
        alignSelf: "center",

    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 70,
        marginHorizontal: 30,
    },
    wrapper: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    username: {
        marginBottom: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white'
    },
    passwordWrapper: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        flexDirection: "row",
        alignItems: "center",
    },
    password: {
        flex: 1,
        fontSize: 16,
        color: 'white'
    },
    passVisibleIcon: {
        marginRight: 5,
    },
    forgotPass: {
        marginTop: 8,

    },
    forgotPassText: {
        color: 'white',
        fontWeight: "bold",
        opacity: 0.8
    },
    inputError: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
    },
    successText: {
        color: 'green',
        fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
    },
    btnSignIn: {
        width: '100%',
        backgroundColor: COLOR.LIGHT_BROWN,
        marginTop: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginBottom: 10,
    },
    btnSignInText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },

});