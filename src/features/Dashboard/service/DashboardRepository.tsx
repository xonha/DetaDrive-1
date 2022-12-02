const urlApi: string = "https://api.detadrive.tk";

export const apiServices = {
  get: (route, header) =>
    fetch(`${urlApi}${route}`, header)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error)),

  post: (route, fetchData) =>
    fetch(`${urlApi}${route}`, fetchData)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error)),

  patch: (route, fetchData) =>
    fetch(`${urlApi}${route}`, fetchData)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error)),

  delete: (route, fetchData) =>
    fetch(`${urlApi}${route}`, fetchData)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error)),
};
