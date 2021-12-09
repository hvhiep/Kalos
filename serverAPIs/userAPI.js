import axios from "axios";

export const SignInAPI = async (username, password) => {
  try {
    const res = await axios.post('https://klos-backend.herokuapp.com/api/users/login', {
      username: username,
      password: password
    });
    console.log('token: ', res.data.token);
    return res;

  } catch (error) {
    return -1;
  }
};

export const SignUpAPI = async (newUser) => {
  try {
    const res = await axios.post('https://klos-backend.herokuapp.com/api/users/register', newUser);

    //trả về thông tin user mới đó, hỏi Quý thử là cái password bị mã hóa thì login bằng pass đó đc k
    return res;

  } catch (error) {
    return -1;
  }
};