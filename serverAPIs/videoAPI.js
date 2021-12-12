import { getWithCheckingToken } from './manageAPI';

const axios = require('axios');

export async function getAllVideo() {
    const response = await getWithCheckingToken('https://klos-backend.herokuapp.com/api/videos')
    return response
  }