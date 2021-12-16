import { HOST } from '../constant';
import { getWithCheckingToken, postWithCheckingToken } from './manageAPI';

const axios = require('axios');

export async function getAllWorkout() {
    const response = await getWithCheckingToken(HOST + '/api/workouts?free=1');
    return response
  }

export const submitWorkout = async (workoutId, time) => {
  const body = {
    idWorkout: workoutId,
    duration: time
  }
  const respone = await postWithCheckingToken(HOST + '/api/workouts/submit', body, {})
  return respone
}

export async function getWorkoutById(id) {
  const response = await getWithCheckingToken(HOST + '/api/workouts/' + id);
  return response
}

export async function getAllWorkoutByTag(id) {
  const response = await getWithCheckingToken(HOST + '/api/workouts?free=1&tag=' + id);
  return response
}