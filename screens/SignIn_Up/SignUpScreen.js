import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import { COLOR } from '../../constant.js';
import SmallAppLogo from '../../assets/images/SmallAppLogo.png';
import { Icon } from 'react-native-elements';

//form validation
import { Formik } from 'formik';


export default function SignUpScreen(props) {

    //check password visibility
    const [isPasswordVisibility, setPasswordVisibility] = useState(true);
    const [isPasswordAuthVisibility, setPasswordAuthVisibility] = useState(true);


    //handle sign up submit
    const handleSignUpSubmit = () => {

    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={SmallAppLogo}></Image>
            <Text style={styles.title}>Đăng Ký</Text>

            {/* formik wraps signup form */}
            <Formik
                initialValues={{ username: '', email: '', password: '', passwordAuth: '' }}
                onSubmit={values => console, log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.wrapper}>
                        {/* username */}
                        <TextInput
                            style={styles.username}
                            placeholder="Tên Đăng Nhập"
                            placeholderTextColor="#888"
                            // use formik props to handle text input
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        >
                        </TextInput>

                        {/* Email */}
                        <TextInput
                            style={styles.username}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        >
                        </TextInput>

                        {/* password */}
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.password}
                                placeholder="Mật Khẩu"
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

                        {/* password authentication */}
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.password}
                                placeholder="Xác Nhận Mật Khẩu"
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

                        {/* sign up button */}
                        <TouchableOpacity onPress={handleSubmit} style={styles.btnSignUp}>
                            <Text style={styles.btnSignUpText}>Đăng Ký</Text>
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
    btnSignUp: {
        width: '100%',
        backgroundColor: COLOR.LIGHT_BROWN,
        marginTop: 50,
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