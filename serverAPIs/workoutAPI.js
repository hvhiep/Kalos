import { postWithCheckingToken } from './manageAPI';

const axios = require('axios');

export async function getAllWorkout() {
    const response = await axios.get('https://klos-backend.herokuapp.com/api/workouts');
    return response
  }

export const submitWorkout = async (workoutId, time) => {
  const body = {
    idWorkout: workoutId,
    duration: time
  }
  const respone = await postWithCheckingToken('https://klos-backend.herokuapp.com/api/workouts/submit', body, {})
  return respone
}