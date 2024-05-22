export const urlApi = "https://api.detadrive.xonha.space";

export const apiServices = {
  post: (route, fetchData) =>
    fetch(`${urlApi}${route}`, fetchData)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error)),
};
