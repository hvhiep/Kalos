import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Icon } from "react-native-elements";
import { COLOR } from '../../constant';
import { toGender, toGoals, toLevelName } from "../../backendRules";

//api
import { getUserToken, storeUserToken } from "../../AsyncStorage/userStorage";

export default function Setting({ route, navigation }) {

    const { userInfo } = route.params;
    console.log(userInfo);

    //render section
    const Section = (props) => {
        return (
            <TouchableOpacity style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>{props.title}</Text>
                <Text style={styles.sectionValue}>{props.value}</Text>
            </TouchableOpacity>
        )
    }

    const SectionAccount = (props) => {
        return (
            <TouchableOpacity style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>{props.title}</Text>
                <Icon
                    name="chevron-right"
                    type="material"
                    size={18}
                    color='white'
                >
                </Icon>

            </TouchableOpacity>
        )
    }

    const handleSignOut = async () => {
        try {
            const savedToken = await getUserToken();
            console.log(savedToken);
            if (savedToken !== -1) {
                const response = await storeUserToken('');
                if (response !== -1)
                    navigation.navigate('Splash', {reRender: true});
                else
                    console.log('xoa token de dang xuat that bai!');
            }
        } catch (error) {
            console.log('dang xuat that bai!');
        }

    }

    return (
        <View style={{ backgroundColor: COLOR.MATTE_BLACK, flex: 1 }}>
            <ScrollView
                style={styles.container}
            >
                <Text style={styles.sectionHeaderWrapper}>Cá Nhân</Text>
                <Section title="Tên: " value={userInfo.name}></Section>
                <Section title="Giới Tính: " value={toGender(userInfo.information.gender)}></Section>
                <Section title="Chiều Cao: " value={userInfo.information.height}></Section>
                <Section title="Cân Nặng: " value={userInfo.information.weight.slice(-1)[0].value}></Section>
                <Section title="Trình Độ: " value={toLevelName(userInfo.information.level)}></Section>
                <Section title="Hít Đất: " value={userInfo.information.performance.pushUp}></Section>
                <Section title="Kéo Xà: " value={userInfo.information.performance.pullUp}></Section>
                <Section title="Squats: " value={userInfo.information.performance.squats}></Section>
                <Section title="Dips: " value={userInfo.information.performance.dips}></Section>
                <TouchableOpacity style={styles.sectionWrapper}
                >
                    <Text style={styles.sectionTitle}>Mục Tiêu: </Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.sectionValue, { width: '60%' }]}>{
                        userInfo.information.goals.reduce((total, item) => {
                            if (total !== '')
                                return total + ", " + toGoals(item);
                            else
                                return total + toGoals(item);
                        }, '')
                    }
                    </Text>
                </TouchableOpacity>
                <Text style={styles.sectionHeaderWrapper}>Tài Khoản</Text>
                <SectionAccount title="Đổi Mật Khẩu"></SectionAccount>
                <SectionAccount title="Gửi Phản Hồi"></SectionAccount>

                {/* Sign Out */}
                <TouchableOpacity onPress={handleSignOut} style={styles.btnSignOut}>
                    <Text style={styles.btnSignOutText}>Đăng Xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: COLOR.MATTE_BLACK,
        marginTop: 80,
        marginBottom: 20,
    },
    sectionHeaderWrapper: {
        flexDirection: 'row',
        width: '100%',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 10,
        marginTop: 15,
        marginBottom: 8
    },
    sectionWrapper: {
        marginHorizontal: 10,
        marginVertical: 0.5,
        padding: 10,
        paddingVertical: 12,
        backgroundColor: COLOR.LIGHT_MATTE_BLACK,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
    },
    sectionValue: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    btnSignOut: {
        alignSelf: "center",
        width: '70%',
        backgroundColor: COLOR.RED,
        marginTop: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        marginBottom: 10,
    },
    btnSignOutText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
});