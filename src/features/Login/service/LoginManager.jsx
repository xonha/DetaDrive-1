import { apiServices } from "./LoginRepository";

export default class LoginManager {
  async postLogin(username, password) {
    try {
      const response = await apiServices.post("/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-Key": "e09HopoZnGSg_RnQDjeM87SoG6JQ85Rd4NpiWdYLGpxod",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async postSignUp(username, password) {
    try {
      const response = await apiServices.post("/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
