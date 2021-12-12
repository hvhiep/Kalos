import { HOST } from "../constant";
import {getUserToken} from '../AsyncStorage/userStorage'

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThmMzMxNTU3YTkyMDY0ZDIyMzc1YWQiLCJpYXQiOjE2MzkwNTQ0Nzl9.rHmT0FR2r0hnMmdvSZ0DXlwalVRFjKlIxXuNrtfSobg"

export const getFavoriteVideos = async (setDataFunction)=>
{
    const token = await getUserToken();

    console.log(token);
    fetch(HOST + '/api/users/me/favorite/videos' , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["favorites"].map((element)=> element["video"]))
    .then(videos => {
        console.log(videos)
        setDataFunction(videos)
    })
}

export const getFavoriteExercises = async (setDataFunction) =>
{
    const token = await getUserToken();

    console.log(token);
    fetch(HOST + '/api/users/me/favorite/exercises' , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["favorites"].map((element)=> element["exercise"]))
    .then(videos => {
        console.log(videos)
        setDataFunction(videos)
    })
}
export const getFavoritePrograms = async (setDataFunction) =>
{
    const token = await getUserToken();

    console.log(token);
    fetch(HOST + '/api/users/me/favorite/programs' , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["favorites"].map((element)=> element["program"]))
    .then(programs => {
        console.log(programs)
        setDataFunction(programs)
    })
}
export const getFavoriteWorkouts = async (setDataFunction) =>
{
    const token = await getUserToken();

    console.log(token);
    fetch(HOST + '/api/users/me/favorite/workouts' , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["favorites"].map((element)=> element["workout"]))
    .then(workouts => {
        console.log(workouts)
        setDataFunction(workouts)
    })
}