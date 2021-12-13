import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserToken = async (value) => {
    try {
        await AsyncStorage.setItem('access_token', value);
        return 1;
    } catch (e) {
        return -1;
    }
};

export const getUserToken = async () => {
    try {
        const value = await AsyncStorage.getItem('access_token');
        if (value === null || value === '') {
            return -1;
        }
        return value;
    } catch (e) {
        return -1;
    }
};
