import React, {useState, useCallback} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DashboardManager from "./service/DashboardManager";
import { useDropzone } from 'react-dropzone'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Popper from '@mui/material/Popper';
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const [files, setFiles] = useState([]);
  const manager = new DashboardManager();
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const username = localStorage.getItem("username")
  const [anchorEl, setAnchorEl] = useState(null);
  let navigate = useNavigate();


  const uploadFiles = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("files", files);
    await manager.postUploadFiles(formData);
    setOpenModal(false)
    setLoading(false)
    setFiles([])
    document.location.reload(true);
  }

  const onDrop = useCallback(async acceptedFile => {
    acceptedFile.map((file) => {
      return setFiles(file)
    });
  })

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.setItem("username",'')
    localStorage.setItem("token",'')
    navigate('/');

  };
  const open = Boolean(anchorEl);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar >
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "0.2fr 1.5fr 0.3fr",
              textAlign: "initial",
            }}
          >
            <div>
              <Typography variant="h6">DetaDrive</Typography>
            </div>
            <div>
              <Button color="inherit" onClick={() => setOpenModal(true)} sx={{textTransform:'none'}}>
                <AddCircleIcon/>
                <Typography sx={{padding:'0px 15px '}}>Adicionar Arquivo</Typography>
              </Button>
            </div>
            <div>
              <Button color="inherit" sx={{textTransform:'none'}} onClick={handleClick}>Olá, {username}!</Button>
              <Popper open={open} anchorEl={anchorEl}>
              <Box sx={{padding: '5px', bgcolor: 'background.paper' }}>
                <Button onClick={handleLogout}>Sair</Button> 
              </Box>
        </Popper>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Dialog onClose={()=>setOpenModal(false)} open={openModal} >
      <DialogTitle >Adicionar Arquivo</DialogTitle>
      <div {...getRootProps()} >
            <input {...getInputProps()} type="file"/>
            {
                isDragActive ?
                <p style={{ border: '1px solid gray', borderStyle: 'dotted', padding: 40, borderRadius: 10, margin:20, width:'200px' }}>Solte aqui o arquivo...</p> :

                files.length!==0?
                <p style={{ border: '1px solid gray', borderStyle: 'dotted', padding: 40, borderRadius: 10,  margin:20, width:'200px' }}>{files.name} </p>:
                <p style={{ border: '1px solid gray', borderStyle: 'dotted', padding: 40, borderRadius: 10,  margin:20, width:'200px' }}>Arraste ou selecione um arquivo </p>
            }
        </div>
      <Button variant="contained" sx={{margin:'10px'}} onClick={() => uploadFiles()}>
        {loading? <Typography>Carregando ...</Typography>:
        <Typography>Adicionar Arquivo</Typography>}
      </Button>
    </Dialog>

    </Box>
  );
}
