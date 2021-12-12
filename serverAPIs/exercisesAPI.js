import { HOST } from "../constant";
import {getUserToken} from '../AsyncStorage/userStorage'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThmMzMxNTU3YTkyMDY0ZDIyMzc1YWQiLCJpYXQiOjE2MzkwNTQ0Nzl9.rHmT0FR2r0hnMmdvSZ0DXlwalVRFjKlIxXuNrtfSobg"

export const getAllExercises = async (setDataFunction)=>
{
    const token = await getUserToken();
    console.log('test token: ', token);
    fetch(HOST + '/api/exercises' , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["exercises"])
    .then(exercises => {
        setDataFunction(exercises)
    })
}