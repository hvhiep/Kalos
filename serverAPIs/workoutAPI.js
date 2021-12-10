const axios = require('axios');

export async function getAllWorkout() {
    const response = await axios.get('https://klos-backend.herokuapp.com/api/workouts');
    return response
  }