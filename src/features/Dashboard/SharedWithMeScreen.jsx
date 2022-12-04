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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import DashboardManager from "./service/DashboardManager";
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CircularProgress from '@mui/material/CircularProgress';

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function SharedWithMeScreen() {
  const manager = new DashboardManager();
  const [files, setFiles] = useState([]);
  const [fileKey, setFileKey] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getFiles() {
    const res = await manager.getSharedWithMeFiles();
    setFiles(res);
    setLoading(false)
  }

  useEffect(() => {
    getFiles();
  }, []);

  function handleToggle (fileKey) {
    setOpen((prevOpen) => !prevOpen);
    setFileKey(fileKey)
  };


  const handleClose = (event) => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  async function handleSendToTrashFile(file) {
    await manager.patchSendToTrashFile(file.key)
    setLoading(true)
    getFiles()
  }

  async function handleDownload(file) {   
    fetch(`https://api.detadrive.tk/file/${file.key}/download`, {
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
    <Box sx={{ flexGrow: 1, maxWidth:"95%"}}>
      <Grid item xs={12} md={6}>
      {loading?
        <div style={{height:'90vh',display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
        <CircularProgress />
        </div>:
        <Demo>
          <List>
            {files &&
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
              })}
          </List>
        </Demo>
}
      </Grid>
    </Box>
    
   
  );
}

