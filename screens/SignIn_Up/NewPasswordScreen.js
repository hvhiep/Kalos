import React, { useState } from "react";
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

export default function NewPasswordScreen(props) {

    //check email input is filled or not
    const [isFilled, setFilled] = useState(false);

    //check password visibility
    const [isPasswordVisibility, setPasswordVisibility] = useState(true);
    const [isPasswordAuthVisibility, setPasswordAuthVisibility] = useState(true);

    const submit = () => {
        props.navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={SmallAppLogo}></Image>
            <Text style={styles.title}>Đổi Mật Khẩu Mới</Text>

            {/* new password form */}
            <View style={styles.wrapper}>
                {/* new password */}
                <View style={styles.passwordWrapper}>
                    <TextInput 
                        style={styles.password} 
                        placeholder="Mật Khẩu Mới" 
                        placeholderTextColor="#888" 
                        secureTextEntry={isPasswordVisibility}>
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
                {/* new password auth */}
                <View style={styles.passwordWrapper}>
                    <TextInput 
                        style={styles.password} 
                        placeholder="Xác Nhận" 
                        placeholderTextColor="#888" 
                        secureTextEntry={isPasswordAuthVisibility}>
                    </TextInput>
                    <TouchableOpacity 
                        onPress={() => 
                        setPasswordAuthVisibility(!isPasswordAuthVisibility)}>
                        <Icon 
                            style={styles.passVisibleIcon} 
                            name={isPasswordAuthVisibility ? 'visibility-off' : 'visibility'} 
                            type="material" 
                            size={22} 
                            color="white">
                        </Icon>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.errorText}>Vui lòng nhập Email !</Text> */}

                {/* sign in button */}
                <TouchableOpacity onPress={submit} style={styles.btnSubmit}>
                    <Text style={styles.btnSubmitText}>Xác Nhận</Text>
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
    errorText: {
        color: 'red',
        fontWeight: "bold",
    },
    btnSubmit: {
        width: '100%',
        backgroundColor: COLOR.LIGHT_BROWN,
        marginTop: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginBottom: 10,
    },
    btnSubmitText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },

});