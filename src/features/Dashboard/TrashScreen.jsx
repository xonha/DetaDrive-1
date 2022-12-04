import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function TrashScreen() {
  const manager = new DashboardManager();
  const [files, setFiles] = useState([]);
  const [fileKey, setFileKey] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    const res = await manager.getFilesOnTrash();
    setFiles(res);
    setLoading(false)
  }

  function handleToggle (fileKey) {
    setOpen((prevOpen) => !prevOpen);
    setFileKey(fileKey)
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

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

  async function handleRestoreFile(file) {
    await manager.patchRestoreFile(file.key)
    setLoading(true)
    getFiles()
  }

  async function handleDeleteFile(file) {
    await manager.deleteFile(file.key)
    setLoading(true)
    getFiles()
  }


  return (
    <Box sx={{ flexGrow: 1, maxWidth:"95%"}}>
      <Grid item xs={12} md={6}>
        {loading?
        <div style={{height:'90vh',display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
        <CircularProgress />
        </div>:
        <Demo>
        {files.length !== 0?
          <List>
              {files.map((file) => {
                return (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleToggle(file.key)}>
                        <MoreVertIcon />                        
                        {fileKey===file.key && (
                          <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          placement="bottom-end"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}                        
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    <MenuItem onClick={()=>handleRestoreFile(file)}>Restaurar</MenuItem>
                                    <MenuItem onClick={()=>handleDeleteFile(file)}>Deletar</MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
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
                );
              })
              }
          </List>
          :
          <Typography>Nenhum arquivo compartilhado</Typography>}
        </Demo>
        }
      </Grid>
    </Box>
  );
}
