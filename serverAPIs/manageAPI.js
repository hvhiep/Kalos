import { getUserToken } from "../AsyncStorage/userStorage"

const axios = require('axios');

export const getWithCheckingToken = async (url, body = {}, header = {}) => {
    const userToken = getUserToken()

    const requestBody = body;
    const requestHeader = {
        "klos-access-token" :  userToken
    }

    return await axios.get(url, requestBody, {header:requestHeader})
}