import axios from 'axios';
import { HOST } from '../constant';
import { getUserToken } from "../AsyncStorage/userStorage";


export const updateBodyIndex = async (weight, height) => {

    try {
        console.log(weight, height);
        let data = {};
        if(weight !== -1)
            data = {weight: weight};
        else if(height !== -1)
            data = {height: height};

        const token = await getUserToken();
        const response = await axios({
            method: 'put',
            baseURL: HOST,
            url: '/api/users/me/information',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'klos-access-token': token, 
            },
            data: data,
        })
        return 1;
    } catch (error) {
        return -1;
    }

}