import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState} from "react";
import DashboardManager from "./service/DashboardManager";

export default function ButtonAppBar() {
  const [files, setFiles] = useState([]);
  const manager = new DashboardManager();

  const uploadFiles = async (event) => {
    setFiles(event.target.files[0]);
    const formData = new FormData();
    formData.append("files", files);
    await manager.postUploadFiles(formData);
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ width: "100%" }}>
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "0.5fr 1.5fr 0.3fr",
              textAlign: "initial",
            }}
          >
            <div>
              <Typography variant="h6">FileTransfer</Typography>
            </div>
            <div>
              <Button color="inherit" onClick={(e) => uploadFiles(e)}>
                Adicionar Arquivo
              </Button>
            </div>
            <div>
              <Button color="inherit">Olá, Camila!</Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
