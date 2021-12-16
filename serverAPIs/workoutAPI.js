import { HOST } from '../constant';
import { getWithCheckingToken, postWithCheckingToken } from './manageAPI';
import { getUserToken } from '../AsyncStorage/userStorage';

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

export const getSubmittedWorkout = async () => {
  try {
    const token = await getUserToken();
    if (token !== -1) {
      const response = await axios({
        method: 'get',
        baseURL: HOST,
        url: '/api/workouts/submit',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'klos-access-token': token,
        },
      })
      return response?.data?.submitted;
    }
  } catch (error) {
    return -1;
  }
}

export const getWorkoutByIdHistory = async (id) => {
  try {
    const token = await getUserToken();
    if (token !== -1) {
      const response = await axios({
        method: 'get',
        baseURL: HOST,
        url: `/api/workouts/${id}`,
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'klos-access-token': token,
        },
      })
      return response?.data?.workout;
    }
  } catch (error) {
    return -1;
  }
}
export const getWorkoutById = async (id) => {
  try {
    const response = await getWithCheckingToken(HOST + '/api/workouts/' + id);
    return response;
  }catch (error) {
    return -1;
  }
}