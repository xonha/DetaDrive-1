import { Alert, AlertTitle } from "@mui/material";
import React,{ useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone'
import DashboardManager from "./service/DashboardManager";
import TabPanel from './DashboardNav'
export function DashboardPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const manager = new DashboardManager()

  const changeHandler = (event) => {
		setFiles(event.target.files[0]);
	};

  const onDrop = useCallback(async acceptedFile => {
    const fetchArray = acceptedFile.map((file) => {
      console.log(file)
      const formData = new FormData();
      formData.append("files", file);
      return fetch("https://api.detadrive.tk/file", {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjkxMTM0NzksInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.aseVwIp3c97Zm3SzCneZhlV8vIY3nQ_Var4HDn82fPo",
        },
      });
    });

    await Promise.all(fetchArray);

  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function uploadFiles() {   
    setLoading(true)
       const formData = new FormData();
       formData.append("files", files);
       await manager.postUploadFiles(formData)
       setLoading(false)
  }

  async function downloadFile() {   
    fetch('https://api.detadrive.tk/file/ybv9otzxoxxv/download', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
      Authorization:
             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk2MzgyMzcsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.MDfLHy7-L223v9LsLHYxqRkJPxw0jGfunMSV-qHfIj8",
    },
  })
  .then((response) => response.blob)
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `FileName.png`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  });
}

  return (
    <div style={{height:'850px'}}>
    <input type="file" name="file" onChange={changeHandler} />
    {loading? 
    <p>Loading</p>
  :
  <div>
      <button onClick={uploadFiles}>Submit</button>
    </div>
  }
    

    <div>
      <button onClick={downloadFile}>Download</button>
    </div>

    <div {...getRootProps()} >
            Repo Tree
            <input {...getInputProps()} type="file"/>
            {
                isDragActive ?
                <p style={{ border: '1px solid gray', borderStyle: 'dotted', padding: 10, borderRadius: 10 }}>Dropping the files...</p> :
                <p style={{ border: '1px solid gray', borderStyle: 'dotted', padding: 10, borderRadius: 10 }}>Drag and drop file here... </p>
            }
        </div>
  </div>
  );
}
