import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

//import material ui stuffes
import { Box, Grid, Paper } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//import AdminPage from "./components/Admin";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import PeopleIcon from "@mui/icons-material/People";
import WebIcon from "@mui/icons-material/Web";
import AdminProjects from "./adminProjects"
import AdminUsers from "./adminUsers"


import config from "../../config";
import Dashboard from "../Dashboard";
import AdminSection from "./adminSections";

const AdminPage = () => {
  const [value, setValue] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  axios.get(config.SERVER_URL + `/api/admin/is_admin`).then((res) => {
    if (res.data.isAdmin) {
      setIsAdmin(1);
    }
    console.log("is admin: ", isAdmin);
  });

  return (
    <div className="AdminPage">
      <Grid container
        direction="row"
        justify="center"
        alignItems="stretch">
        <Grid Item xs={12}>
          <Route path="/">
            {isAdmin ? (
              <Tabs value={value} onChange={handleChange} centered>
                  <Tab
                    icon={<WebIcon />}
                    label="Manage Projects"
                    component={Link}
                    to="/admin/adminProjects"
                  />
                  <Tab
                    icon={<PeopleIcon />}
                    label="Manage Users"
                    component={Link}
                    to="/admin/adminUsers"
                  />
                  <Tab
                    icon={<GroupWorkIcon />}
                    label="Manage Sections"
                    component={Link}
                    to="/admin/adminSections"
                  />      
              </Tabs>) : null}
          </Route>
        </Grid>
        <Grid item xs={12}>
          <Switch>
            {/* <Route exact path="/" component={AdminPage} /> */}
            <Route path="/admin/adminProjects" component={AdminProjects} /> 
            <Route path="/admin/adminUsers" component={Dashboard} />
            <Route path="/admin/adminSections" component={AdminSection} />
            {/* should change to corresponding component after implementation*/}
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default hot(AdminPage);
