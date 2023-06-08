import DrawerComponent from "./../../components/Drawer";
import ContactTable from "./ContactTable";

import {
  Grid
} from "@mui/material";
import { useSelector } from 'react-redux';

export default function Contacts() {
  const { drawerOpen} = useSelector((state) => state.menu);
  const { DrawerComponentChild } = useSelector((state) => state.drawer);
  
  return (
    <>
      <DrawerComponent component={<DrawerComponentChild />} />
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sm={6} md={4} lg={drawerOpen?10:12}>
          <ContactTable></ContactTable>
        </Grid>
      </Grid>
    </>
  );
}
