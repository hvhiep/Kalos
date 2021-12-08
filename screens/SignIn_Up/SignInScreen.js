import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import { STATUSBAR_HEIGHT, COLOR } from '../../constant.js';
import SmallAppLogo from '../../assets/images/SmallAppLogo.png';
import { Icon } from 'react-native-elements';
//userAPI
import SignInAPI from "../../serverAPIs/userAPI.js";
import { storeUserToken } from "../../AsyncStorage/userStorage.js";

export default function SignInScreen(props) {

    const [isPasswordVisibility, setPasswordVisibility] = useState(true);

    //==========Tạm thời để là admin để dễ làm việc, sau này sẽ là ''============================================================
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    //show error text if submit form with empty input
    const [isInputEmpty, setInputEmpty] = useState(0);

    //handle and validate sign in form submit
    const handleSignInSubmit = async () => {
        //1. validation: check empty input
        if (username === '' || password === '') {
            setInputEmpty(1);
        }
        else {
            //send username + pass to server to get token
            const res = await SignInAPI(username, password);
            //store token in async storage
            const storeResult = await storeUserToken(res.data.token);
            //navigate to home screen if success
            if(storeResult)
                props.navigation.navigate('Tab');
            else
                console.log('Failed to save user token!');
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

                {/* sign in button */}
                <TouchableOpacity onPress={handleSignInSubmit} style={styles.btnSignIn}>
                    <Text style={styles.btnSignInText}>Đăng Nhập</Text>
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