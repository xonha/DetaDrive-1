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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function FilesList() {
  const manager = new DashboardManager();
  const [files, setFiles] = useState([]);
  const [fileKey, setFileKey] = useState('');
  const [fileName, setFileName] = useState('');

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function getFiles() {
      const res = await manager.getAllFiles();
      setFiles(res);
    }
    getFiles();
  }, []);

  function handleToggle (fileKey) {
    setOpen((prevOpen) => !prevOpen);
    setFileKey(fileKey)
  };

  function handleModal (file) {
    setOpenModal((prevOpen) => !prevOpen);
    setFileName(file.name)
    setFileKey(file.key)
  };

  const handleClose = (event) => {
    setOpen(false);
    setOpenModal(false)
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
  }

  async function handleRenameFile() {
    await manager.patchRenameFile(fileKey, fileName)
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth:"95%"}}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List>
            {files &&
              files.map((file) => {
                return (
                  <div>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleToggle(file.key)}>
                        <MoreVertIcon />                        
                        {fileKey===file.key && (
                          <Popper
                          open={open}
                          role={undefined}
                          placement="right-start"
                          transition
                          disablePortal
                        >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    <MenuItem onClick={()=>handleModal(file)}>Renomear</MenuItem>
                                    <MenuItem onClick={handleClose}>Compartilhar</MenuItem>
                                    <MenuItem onClick={()=>handleSendToTrashFile(file)}>Excluir</MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                        </Popper>
                        )}
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
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
        
      </Grid>
      <Dialog onClose={handleClose} open={openModal} >
      <DialogTitle >Renomear Arquivo</DialogTitle>
      <TextField id="standard-basic" defaultValue={fileName} variant="standard" sx={{padding:'20px'}} onChange={(event)=>setFileName(event.target.value)}/>
      <Button variant="contained" sx={{margin:'10px'}} onClick={()=>handleRenameFile()}>Renomear</Button>
    </Dialog>
    </Box>
    
   
  );
}

