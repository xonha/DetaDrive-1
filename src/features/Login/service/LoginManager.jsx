import {apiServices} from "./LoginRepository";


export default class LoginManager {

  async postLogin(username, password) {
    try {
      const response = await apiServices.post('/login', 
      {method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          username: username,
          password: password
        }
        )
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async postSignUp(username, password) {
    try {
      const response = await apiServices.post('/register', 
      {method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          username: username,
          password: password
        }
        )
      });
      return response
    } catch (error) {
      return error;
    }
  }

}
