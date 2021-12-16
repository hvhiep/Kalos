import { HOST } from '../constant';
import { getWithCheckingToken } from './manageAPI';

const axios = require('axios');

export async function getAllVideo() {
    const response = await getWithCheckingToken(HOST + '/api/videos')
    return response
  }

  export async function getVideoById(id) {
    const response = await getWithCheckingToken(HOST + '/api/videos/' + id)
    return response
  }