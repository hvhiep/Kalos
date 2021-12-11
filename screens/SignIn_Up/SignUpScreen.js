import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { COLOR } from '../../constant.js';
import SmallAppLogo from '../../assets/images/SmallAppLogo.png';
import { Icon } from 'react-native-elements';
import { SignUpAPI, SignInAPI } from '../../serverAPIs/userAPI';
import { storeUserToken } from "../../AsyncStorage/userStorage.js";

//form validation
import { Formik } from 'formik';
import { SignupSchema } from './Validation';

export default function SignUpScreen(props) {

    //check password visibility
    const [isPasswordVisibility, setPasswordVisibility] = useState(true);
    const [isPasswordAuthVisibility, setPasswordAuthVisibility] = useState(true);
    const [isSignUpError, setSignUpError] = useState(false);
    const [isAPICalling, setAPICalling] = useState(false);
    const [isSignUpSuccess, setSignUpSuccess] = useState(false);

    //handle sign up submit
    const handleSignUpSubmit = async (values) => {
        setAPICalling(true);
        //survey info
        const userSurveyInfo = props.route.params;
        //remove passwordAuth element
        const newUser = {
            username: values.username,
            password: values.password,
            name: userSurveyInfo.name,
            gender: userSurveyInfo.gender,
            goals: userSurveyInfo.goals,
            level: userSurveyInfo.level,
            height: userSurveyInfo.height,
            weight: userSurveyInfo.weight,
            pullUp: userSurveyInfo.performance.pullUp,
            pushUp: userSurveyInfo.performance.pushUp,
            dips: userSurveyInfo.performance.dips,
            squats: userSurveyInfo.performance.squats,
        };

        //send object data to server for validation
        const response = await SignUpAPI(newUser);
        //if SUCCESS: sign with new user info (username + password above) + navigate to Home
        if (response !== -1) {
            setAPICalling(false);
            const loginResponse = await SignInAPI(values.username, values.password);
            if (loginResponse !== -1) {
                setSignUpSuccess(true);
                setSignUpError(false);
                //store token in async storage
                const storeResult = await storeUserToken(loginResponse.data.token);
                //navigate to home screen if success
                if (storeResult) {
                    props.navigation.navigate('Tab');
                }
                else
                    console.log('Có lỗi khi lưu token!');
            }
            else
                console.log('Có Lỗi Khi Đăng Nhập!')
        }
        else {
            setAPICalling(false);
            //if FAIL: return error from server response (like: dup username)
            setSignUpError(true);
        }

    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={SmallAppLogo}></Image>
            <Text style={styles.title}>Đăng Ký</Text>

            {/* formik wraps signup form */}
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ username: '', password: '', passwordAuth: '' }}
                onSubmit={(values) => handleSignUpSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.wrapper}>
                        {/* username */}
                        <TextInput
                            style={styles.username}
                            placeholder="Tên Đăng Nhập *"
                            placeholderTextColor="#888"
                            // use formik props to handle text input
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        >
                        </TextInput>
                        {/* show validation error */}
                        {
                            errors.username && touched.username ? (
                                <Text style={styles.errorText}>
                                    {errors.username}
                                </Text>
                            ) : null
                        }

                        {/* password */}
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.password}
                                placeholder="Mật Khẩu *"
                                placeholderTextColor="#888"
                                secureTextEntry={isPasswordVisibility}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
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
                        {/* show validation error */}
                        {
                            errors.password && touched.password ? (
                                <Text style={styles.errorText}>
                                    {errors.password}
                                </Text>
                            ) : null
                        }


                        {/* password authentication */}
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.password}
                                placeholder="Xác Nhận Mật Khẩu *"
                                placeholderTextColor="#888"
                                secureTextEntry={isPasswordAuthVisibility}
                                onChangeText={handleChange('passwordAuth')}
                                onBlur={handleBlur('passwordAuth')}
                                value={values.passwordAuth}
                            >
                            </TextInput>
                            <TouchableOpacity
                                onPress={() => setPasswordAuthVisibility(!isPasswordAuthVisibility)}>
                                <Icon
                                    style={styles.passVisibleIcon}
                                    name={isPasswordAuthVisibility ? 'visibility-off' : 'visibility'}
                                    type="material"
                                    size={22}
                                    color="white">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        {/* show validation error */}
                        {
                            errors.passwordAuth && touched.passwordAuth ? (
                                <Text style={styles.errorText}>
                                    {errors.passwordAuth}
                                </Text>
                            ) : null
                        }

                        {/* duplicated username error */}
                        <Text
                            style={[styles.errorText, isSignUpError === true ? { display: 'flex' } : { display: 'none' }]}
                        >
                            Tên Đăng Nhập Bị Trùng!
                        </Text>
                        {/* sign up is success */}
                        <Text
                            style={[styles.successText, isSignUpSuccess === true ? { display: 'flex' } : { display: 'none' }]}
                        >
                            Đăng Ký Thành Công!
                        </Text>


                        {/* sign up button */}
                        <TouchableOpacity onPress={handleSubmit} style={styles.btnSignUp}>
                            <Text
                                style={[styles.btnSignUpText, isAPICalling === false ? { display: 'flex' } : { display: 'none' }]}
                            >
                                Đăng Ký
                            </Text>
                            <ActivityIndicator
                                style={isAPICalling === true ? { display: 'flex' } : { display: 'none' }}
                                size="small"
                                color='white'
                            >
                            </ActivityIndicator>

                        </TouchableOpacity>
                    </View>
                )}
            </Formik >
        </View >
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
        marginTop: 40,
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
    btnSignUp: {
        width: '100%',
        backgroundColor: COLOR.LIGHT_BROWN,
        marginTop: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginBottom: 10,
    },
    btnSignUpText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },

});