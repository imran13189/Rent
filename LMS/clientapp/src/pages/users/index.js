import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import DrawerComponent from "./../../components/Drawer";
import UsersTable from "./UsersTable";
import UsersForm from './UsersForm';
import { Grid } from "@mui/material";

export default function Contacts() {
  const theme = useTheme();
  return (
    <>
      <DrawerComponent component={<UsersForm />} />
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sm={6} md={4} lg={12}>
          <UsersTable />
        </Grid>
      </Grid>
    </>
  );
}
