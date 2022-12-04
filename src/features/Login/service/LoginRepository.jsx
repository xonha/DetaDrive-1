const urlApi = "https://api.detadrive.tk";

export const apiServices = {
  post: (route, fetchData) =>
    fetch(`${urlApi}${route}`, fetchData)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error)),
};
