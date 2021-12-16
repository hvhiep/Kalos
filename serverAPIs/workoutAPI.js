import { postWithCheckingToken, getWithCheckingToken} from './manageAPI';

const axios = require('axios');

export async function getAllWorkout() {
    const response = await axios.get('https://klos-backend.herokuapp.com/api/workouts?free=1');
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

export async function getWorkoutById(id) {
  const response = await getWithCheckingToken('https://klos-backend.herokuapp.com/api/workouts/' + id)
  return response
}