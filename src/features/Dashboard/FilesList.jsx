import CloseIcon from "@mui/icons-material/Close";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { urlApi } from "../Login/service/LoginRepository";
import DashboardManager from "./service/DashboardManager";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function FilesList() {
  const manager = new DashboardManager();
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [fileKey, setFileKey] = useState("");
  const [fileName, setFileName] = useState("");
  const [shareWithUserKey, setShareWithUserKey] = useState("");
  const [makeOwner, setMakeOwner] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const auth = `bearer ${localStorage.getItem("token")}`;

  async function getFiles() {
    const res = await manager.getAllFiles();
    setFiles(res);
    setLoading(false);
  }

  useEffect(() => {
    async function getUsers() {
      const res = await manager.getUsers();
      setUsers(res);
    }
    getFiles();
    getUsers();
  }, []);

  function handleToggle(fileKey) {
    setOpen((prevOpen) => !prevOpen);
    setFileKey(fileKey);
  }

  function handleModal(file) {
    setOpenModal((prevOpen) => !prevOpen);
    setFileName(file.name);
    setFileKey(file.key);
  }

  function handleShareWithModal(file) {
    setOpenShareModal((prevOpen) => !prevOpen);
    setFileKey(file.key);
  }

  const handleClose = (event) => {
    setOpen(false);
    setOpenModal(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  async function handleSendToTrashFile(file) {
    await manager.patchSendToTrashFile(file.key);

    setLoading(true);
    getFiles();
  }

  async function handleRenameFile() {
    await manager.patchRenameFile(fileKey, fileName);
    setLoading(true);
    setOpenModal(false);
    getFiles();
  }

  async function handleShareWith() {
    if (makeOwner === false) {
      await manager.postShareWith(fileKey, shareWithUserKey);
      setLoading(true);
      setOpenShareModal(false);
      setShouldShowAlert(true);
      getFiles();
    } else {
      await manager.patchChangeOwner(fileKey, shareWithUserKey);
      setLoading(true);
      setOpenShareModal(false);
      setShouldShowAlert(true);
      getFiles();
    }
  }

  async function handleDownload(file) {
    fetch(`${urlApi}/file/${file.key}/download`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: auth,
      },
    })
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = file.name;
        a.click();
      });
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "95%", height: "80vh" }}>
      <Grid item xs={12} md={6}>
        {shouldShowAlert && (
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShouldShowAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Compartilhado com sucesso
          </Alert>
        )}
        {loading ? (
          <div
            style={{
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Demo>
            <List>
              {files.length !== 0 ? (
                files.map((file) => {
                  return (
                    <div>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleToggle(file.key)}
                          >
                            <MoreVertIcon />
                            {fileKey === file.key && (
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
                                      <MenuItem
                                        onClick={() => handleModal(file)}
                                      >
                                        Renomear
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleShareWithModal(file)
                                        }
                                      >
                                        Compartilhar
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleSendToTrashFile(file)
                                        }
                                      >
                                        Excluir
                                      </MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Popper>
                            )}
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <IconButton onClick={() => handleDownload(file)}>
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
              ) : (
                <div style={{ padding: "40px 0px", textAlign: "center" }}>
                  <Typography>Nenhum arquivo encontrado</Typography>
                </div>
              )}
            </List>
          </Demo>
        )}
      </Grid>
      <Dialog onClose={handleClose} open={openModal}>
        <DialogTitle>Renomear Arquivo</DialogTitle>
        <TextField
          id="standard-basic"
          defaultValue={fileName}
          variant="standard"
          sx={{ padding: "20px" }}
          onChange={(event) => setFileName(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{ margin: "10px" }}
          onClick={() => handleRenameFile()}
        >
          Renomear
        </Button>
      </Dialog>

      <Dialog
        onClose={() => setOpenShareModal(false)}
        open={openShareModal}
        sx={{ textAlign: "center" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              height: "266px",
            }}
          >
            {users.map((user) => (
              <List>
                <ListItem>
                  <ListItemText primary={user.username} secondary={user.key} />
                </ListItem>
              </List>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <DialogTitle sx={{ width: "300px" }}>
              Compartilhar Arquivo
            </DialogTitle>
            <div style={{ width: "300px", padding: "10px 20px" }}>
              <TextField
                id="standard-basic"
                label="Identificação do usuário"
                variant="standard"
                onChange={(event) => setShareWithUserKey(event.target.value)}
              />
              <FormControlLabel
                control={<Switch defaultValue={makeOwner} />}
                label="Torna-lo dono do arquivo"
                onChange={(event) => setMakeOwner(event.target.checked)}
                sx={{ padding: "20px 0px" }}
              />
              <Button
                variant="contained"
                sx={{ margin: "10px" }}
                onClick={() => handleShareWith()}
              >
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Box>
  );
}
