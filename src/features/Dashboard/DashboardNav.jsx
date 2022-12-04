import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FilesList from "./FilesList";
import TrashScreen from "./TrashScreen";
import ResponsiveAppBar from "./HeaderNavbar";
import SharedWithMeScreen from "./SharedWithMeScreen"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DashboardNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
          width: "100%"
                }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", padding:"50px 0px 0px 0px" }}
        >
          <Tab label="Meus Arquivos" {...a11yProps(0)} />
          <Tab label="Compartilhados Comigo" {...a11yProps(1)} />
          <Tab label="Lixeira" {...a11yProps(2)} />
        </Tabs>
        <div style={{ width: "100%" }}>
          <TabPanel value={value} index={0}>
            Meus Arquivos
            <FilesList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Compartilhados Comigo
            <SharedWithMeScreen/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Lixeira
            <TrashScreen />
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
