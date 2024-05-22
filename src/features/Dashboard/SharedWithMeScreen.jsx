import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useEffect, useState } from "react";
import DashboardManager from "./service/DashboardManager";
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";
import { urlApi } from "../Login/service/LoginRepository";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function SharedWithMeScreen() {
  const manager = new DashboardManager();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getFiles() {
    const res = await manager.getSharedWithMeFiles();
    setFiles(res);
    setLoading(false)
  }

  useEffect(() => {
    getFiles();
  }, []);

  async function handleDownload(file) {   
    fetch(`${urlApi}/file/${file.key}/download`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzAxMjUzOTEsInVzZXJuYW1lIjoiY2FtaWxhIiwicGFzc3dvcmQiOiIkMmIkMTIkZVFDRjNDUU5iT1FKU1Ric01qNU1kdU9jS0VHR1hxaXBGbDlRSm10YmdzbG9IbjloQkt5em0iLCJrZXkiOiIyNnpjNDdveGx6aWsifQ.Pcj4Od1ugUkYAcR0-jyw-fpoYBJ1vJ0jKja3JYLVcGk",
      },
    })
    .then((res) => { return res.blob(); })
    .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = file.name;
      a.click();
    });
}


  return (
    <Box sx={{ flexGrow: 1, maxWidth:"95%", height:'80vh'}}>
      <Grid item xs={12} md={6}>
      {loading?
        <div style={{height:'90vh',display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
        <CircularProgress />
        </div>:
        <Demo>
          <List>
            {files.length!== 0 ?
              files.map((file) => {
                return (
                  <div>
                  <ListItem>
                    <ListItemAvatar>
                      <IconButton onClick={()=>handleDownload(file)}>
                        <DownloadForOfflineIcon />
                      </IconButton>
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={file.name}
                      secondary={file.size}
                    />
                  </ListItem>
                  </div>
                );
              })
            :
            <div style={{padding:'40px 0px', textAlign:'center'}}>
            <Typography>Nenhum arquivo encontrado</Typography>
            </div>}
          </List>
        </Demo>
}
      </Grid>
    </Box>
    
   
  );
}

