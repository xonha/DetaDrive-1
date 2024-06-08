import { apiServices } from "./DashboardRepository";

function getAuth() {
  return `bearer ${localStorage.getItem("token")}`;
}
export default class DashboardManager {
  async postUploadFiles(files) {
    try {
      const response = await apiServices.post("/file", {
        method: "POST",
        body: files,
        headers: {
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUsers() {
    try {
      const response = await apiServices.get("/user", {
        method: "GET",
        headers: {
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getDownloadFile(fileKey) {
    try {
      const response = await apiServices.get(`/file/${fileKey}/download`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAllFiles() {
    try {
      const response = await apiServices.get(`/file/owned`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getFilesOnTrash() {
    try {
      const response = await apiServices.get(`/trash`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async patchSendToTrashFile(fileKey) {
    try {
      const response = await apiServices.patch(
        `/file/${fileKey}/send_to_trash`,
        {
          method: "PATCH",
          headers: {
            Authorization: getAuth(),
          },
        },
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async patchRestoreFile(fileKey) {
    try {
      const response = await apiServices.patch(`/trash/${fileKey}`, {
        method: "PATCH",
        headers: {
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async patchRenameFile(fileKey, name) {
    try {
      const response = await apiServices.patch(`/file/${fileKey}/rename`, {
        method: "PATCH",
        body: JSON.stringify({ name: name }),
        headers: {
          Authorization: getAuth(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async postShareWith(fileKey, userKey) {
    try {
      const response = await apiServices.post(
        `/file/${fileKey}/share ?share_with=${userKey}`,
        {
          method: "POST",
          headers: {
            Authorization: getAuth(),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async patchChangeOwner(fileKey, userKey) {
    try {
      const response = await apiServices.patch(
        `/file/${fileKey}/change_owner`,
        {
          method: "PATCH",
          body: JSON.stringify({ owner_key: userKey }),
          headers: {
            Authorization: getAuth(),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async getSharedWithMeFiles() {
    try {
      const response = await apiServices.get(`/file/shared`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: getAuth(),
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteFile(fileKey) {
    try {
      const response = await apiServices.delete(`/trash/${fileKey}`, {
        method: "DELETE",
        headers: {
          Authorization: getAuth(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
