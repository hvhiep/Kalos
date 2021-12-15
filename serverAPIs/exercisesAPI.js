import { HOST } from "../constant";
import {getUserToken} from '../AsyncStorage/userStorage'
import { getWithCheckingToken } from "./manageAPI";
import axios from "axios";


// export const getAllExercises = async (setDataFunction)=>
// {
//     try{
//         const token = await getUserToken();
//         fetch(HOST + '/api/exercises' , 
//             {
//                 method: "GET",
//                 headers:{
//                     'Content-type' : 'application/json',
//                     'Accept' : 'application/json',
//                     'klos-access-token': token
//             }}
//         )
//         .then(response => response.json())
//         .then(data => data["exercises"])
//         .then(exercises => {
//             setDataFunction(exercises)
//         })
//     }catch (error) {
//         return -1;
//     }
// }

export const getAllExercises = async () => {
    try{
        const token = await getUserToken();
        const response = await axios({
            method: 'get',
            baseURL: HOST,
            url:  '/api/exercises',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'klos-access-token': token,
            },
        })
        return response?.data?.exercises;
    }catch (error) {
        return -1;
    }
}

export async function getExcerciseById(id) {
    const response = await getWithCheckingToken('https://klos-backend.herokuapp.com/api/exercises/' + id)
    return response
  }