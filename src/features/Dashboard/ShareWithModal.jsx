import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import DashboardManager from "./service/DashboardManager";
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function ShareWithModal(
  openModal
) {
  const manager = new DashboardManager();
  const [files, setFiles] = useState([]);
  const [fileKey, setFileKey] = useState('');
  const [fileName, setFileName] = useState('');
 


  async function handleRenameFile() {
   console.log('nhau')
  }

  return (
    <Box>
      <Dialog onClose={openModal=false} open={openModal} >
      <DialogTitle >Compartilhar Arquivo</DialogTitle>
      <TextField id="standard-basic" defaultValue="Identificação do usuário" variant="standard" sx={{padding:'20px'}} onChange={(event)=>setFileName(event.target.value)}/>
      <FormControlLabel control={<Switch defaultChecked />} label="Torna-lo dono do arquivo" />
      <Button variant="contained" sx={{margin:'10px'}} onClick={()=>handleRenameFile()}>Compartilhar</Button>
    </Dialog>
    </Box>
    
   
  );
}

