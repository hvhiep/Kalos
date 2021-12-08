import axios from "axios";

const SignInAPI = async (username, password) => {
  try {
    const res = await axios.post('https://klos-backend.herokuapp.com/api/users/login', {
      username: username,
      password: password
    });
    console.log('token: ', res.data.token);
    return res;

  } catch (error) {
    return error;
  }
}

export default SignInAPI;