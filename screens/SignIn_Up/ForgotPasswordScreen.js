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

export default function ForgotPasswordScreen(props) {

    //check email input is filled or not
    const [isFilled, setFilled] = useState(false);

    const submitEmail = () => {
        if(isFilled)
            props.navigation.navigate('EmailAuth');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={SmallAppLogo}></Image>
            <Text style={styles.title}>Lấy Lại Mật Khẩu</Text>

            {/* email form */}
            <View style={styles.wrapper}>
                {/* email */}
                <TextInput 
                    style={styles.email} 
                    placeholder="Email" 
                    placeholderTextColor="#888"
                    onChangeText={(email) => {email === '' ? setFilled(false) : setFilled(true)}}>
                </TextInput>
                {/* <Text style={styles.errorText}>Vui lòng nhập Email !</Text> */}

                {/* sign in button */}
                <TouchableOpacity onPress={submitEmail} style={styles.btnSubmit}>
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
    email: {
        marginBottom: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white'
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