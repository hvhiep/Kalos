import axios from "axios";
import { HOST } from '../constant';
import { getUserToken } from "../AsyncStorage/userStorage";

export const getMe = async () => {

    try {
        const token = await getUserToken();

        const response = await axios({
            method: 'get',
            baseURL: HOST,
            url: '/api/users/me',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'klos-access-token': token,
            },
        })
        return JSON.parse(response.request._response);

    } catch (error) {
        return -1;
    }

}