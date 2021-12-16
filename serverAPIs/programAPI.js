import { HOST } from '../constant';
import { getWithCheckingToken } from './manageAPI';

const axios = require('axios');

export async function getAllProgram() {
    const response = await getWithCheckingToken(HOST + '/api/programs');
    return response
  }

  export async function getProgramById(id) {
    const response = await getWithCheckingToken(HOST + '/api/programs/' + id);
    return response
  }
