const axios = require('axios');

export async function getAllProgram() {
    const response = await axios.get('https://klos-backend.herokuapp.com/api/programs');
    return response
  }
