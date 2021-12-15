import { getUserToken } from "../AsyncStorage/userStorage"

const axios = require('axios');

export const getWithCheckingToken = async (url, header = {}) => {
    const userToken = await getUserToken()

    const requestHeader = {
        "klos-access-token" :  userToken
    }

    return await axios.get(url, {headers : requestHeader})
}

export const postWithCheckingToken = async (url, body = {}, header = {}) => {
    const userToken = await getUserToken()

    const requestBody = body;
    const requestHeader = {
        "klos-access-token" :  userToken
    }
    // console.log(url)
    // console.log(requestBody)
    // console.log(requestHeader)
    const res = await axios.post(url, requestBody, {headers:requestHeader})
    return res
}