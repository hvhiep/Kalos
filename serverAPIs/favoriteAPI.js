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

export const toggleExerciseLike = async (exerciseId)=>{
    const token = await getUserToken();
    const response = fetch(HOST + '/api/users/me/favorite/exercises' , 
        {
            method: "POST",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
            },
            body: JSON.stringify({idExercise: exerciseId})
        }
    ).then(res => console.log(res))
}

export const toggleVideoLike = async (videoId)=>{
    const token = await getUserToken();
    const response = fetch(HOST + '/api/users/me/favorite/videos' , 
        {
            method: "POST",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
            },
            body: JSON.stringify({idVideo: videoId})
        }
    ).then(res => console.log(res))
}

export const toggleWorkoutLike = async (workoutId)=>{
    const token = await getUserToken();
    const response = fetch(HOST + '/api/users/me/favorite/workouts' , 
        {
            method: "POST",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
            },
            body: JSON.stringify({idWorkout: workoutId})
        }
    ).then(res => console.log(res))
}

export const toggleProgramLike = async (programId)=>{
    const token = await getUserToken();
    try{
        const response = fetch(HOST + '/api/users/me/favorite/programs' , 
        {
            method: "POST",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
            },
            body: JSON.stringify({idProgram: programId})
        }
        ).then(res => console.log(res))
    }
    catch(e)
    {
        console.log("error : ", e)
    }
    
}




export const getVideoById = async (videoId, setDataFunction) =>
{
    const token = await getUserToken();

    console.log(token);
    fetch(HOST + '/api/videos/' + videoId , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["video"])
    .then(video => {
        console.log(video)
        setDataFunction(video)
    })
}
export const getWorkoutById = async (workoutId, setDataFunction) =>
{
    const token = await getUserToken();

    console.log(token);
    fetch(HOST + '/api/workouts/' + workoutId , 
        {
            method: "GET",
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'klos-access-token': token
        }}
    )
    .then(response => response.json())
    .then(data => data["workout"])
    .then(workout => {
        console.log(workout)
        setDataFunction(workout)
    })
}
