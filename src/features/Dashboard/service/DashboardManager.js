import {apiServices} from "./DashboardRepository";

let Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzAxMjUzOTEsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.Pcj4Od1ugUkYAcR0-jyw-fpoYBJ1vJ0jKja3JYLVcGk"
export default class DashboardManager {
  async postUploadFiles(files) {
    try {
      const response = await apiServices.post('/file', 
      {method: 'POST',
        body: files, 
      headers: {
        Authorization: Auth
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async getDownloadFile(fileKey) {
    try {
      const response = await apiServices.get(`/file/${fileKey}/download`, 
      {method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        Authorization: Auth
      }
      });
      console.log(response)
      return response
    } catch (error) {
      return error;
    }
  }

  async getAllFiles() {
    try {
      const response = await apiServices.get(`/file/owned`, 
      {method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        Authorization:Auth
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async getFilesOnTrash() {
    try {
      const response = await apiServices.get(`/trash`, 
      {method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        Authorization: Auth
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async patchSendToTrashFile(fileKey) {
    try {
      const response = await apiServices.post(`/file/${fileKey}/send_to_trash`, 
      {method: 'PATCH',
      headers: {
        Authorization: Auth
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async patchRestoreFile(fileKey) {
    try {
      const response = await apiServices.post(`/trash/${fileKey}`, 
      {method: 'PATCH',
      headers: {
        Authorization: Auth}
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async patchRenameFile(fileKey, name) {
    try {
      const response = await apiServices.post(`/file/${fileKey}/rename`, 
      {method: 'PATCH',
      body: JSON.stringify({name: name}),
      headers: {
        Authorization: Auth,
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async postShareWith(fileKey, userKey) {
    try {
      const response = await apiServices.post(`/file/${fileKey}/share ?share_with=${userKey}`, 
      {method: 'POST', 
      headers: {
        Authorization: Auth,
        'Accept': 'application/json',
    'Content-Type': 'application/json'
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async patchChangeOwner(fileKey, userKey) {
    try {
      const response = await apiServices.post(`/file/${fileKey}/change_owner`, 
      {method: 'PATCH',
      body: JSON.stringify({owner_key:userKey}), 
      headers: {
        Authorization: Auth,
        'Accept': 'application/json',
    'Content-Type': 'application/json'
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async getSharedWithMeFiles() {
    try {
      const response = await apiServices.get(`/file/shared`, 
      {method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        Authorization:Auth
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

  async deleteFile(fileKey) {
    try {
      const response = await apiServices.post(`/trash/${fileKey}`, 
      {method: 'DELETE',
      headers: {
        Authorization: Auth,
        'Accept': 'application/json',
    'Content-Type': 'application/json'
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }
}
