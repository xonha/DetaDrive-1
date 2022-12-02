import {apiServices} from "./DashboardRepository";


export default class DashboardManager {
  async postUploadFiles(files) {
    try {
      const response = await apiServices.post('/file', 
      {method: 'POST',
        body: files, 
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
      }
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
      body: {name: 'teste'},
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk5NTk1MDcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.87tT3UhM3cuWCW-XqJVw0wPr_yihDinBsutHQihPBDs",
      }
      });
      return response
    } catch (error) {
      return error;
    }
  }

}
