import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedContact,
  fetchPosts,
  fetchStatus,
} from "./../../store/reducers/contact";
import { openDrawer, setDrawerComponent } from "./../../store/reducers/drawer";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "./../../routes/AuthProvider";
import Search from "../../layout/MainLayout/Header/HeaderContent/Search";
import FormToolTip from "./FormTooltip";
import ContactForm from "./ContactForm";
import InlineEditForm from "./InlineEditForm";


function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // { id: 'contactId', label: '', minWidth: 170 },
  { id: "firstName", label: "Name" },
  { id: "brand", label: "Brand" },
  { id: "status", label: "Status" },
  {
    id: "dealerShipName",
    label: "DealerShipName",
    //minWidth: 170,
    align: "right",
    disablePadding: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "locations",
    label: "Locations",
    //minWidth: 170,
    align: "right",
    disablePadding: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    //minWidth: 170,
    align: "right",
    disablePadding: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "serviceInterestedIn",
    label: "Service Interested In",
    //minWidth: 170,
    align: "right",
    disablePadding: false,
    format: (value) => {
      return value ? "Yes" : "No";
    },
  },
  {
    id: "otherGroupAffiliation",
    label: "OtherGroupAffiliation",
    //minWidth: 170,
    align: "right",
    disablePadding: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "keyContactPerson",
    label: "KeyContactPerson",
    //minWidth: 170,
    disablePadding: false,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "mobile",
    label: "Mobile",
    //minWidth: 170,
    disablePadding: false,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    //minWidth: 170,
    disablePadding: false,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "otherBrandAssociation",
    label: "OtherBrandAssociation",
    //minWidth: 170,
    disablePadding: false,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "otherBrandRegion",
    label: "OtherBrandRegion",
    //minWidth: 170,
    disablePadding: false,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "edit",
    label: "OtherBrandRegion",
    //minWidth: 170,
    disablePadding: false,
    align: "right",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const dispatch = useDispatch();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <Button
            onClick={() => {
              dispatch(
                setDrawerComponent({
                  DrawerComponentChild: ContactForm,
                })
              );
              dispatch(
                setSelectedContact({
                  contactDetails: { accountList: [], country: "India" ,stateName:"Select"},
                })
              );
              dispatch(openDrawer({ drawerOpen: true }));
            }}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <Search handleSearch={props.handleSearch} />
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ContactTable() {
  const { user } = useAuth();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const { contactsData, statusData } = useSelector((state) => state.contact);
  const [filteredData, setFilteredData] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = contactsData.map((n) => n.contactId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onEditClick = (row) => {
   
    dispatch(
      setDrawerComponent({
        DrawerComponentChild: ContactForm,
      })
    );

    dispatch(setSelectedContact({ contactDetails: row }));
    dispatch(openDrawer({ drawerOpen: true }));
  };

  const onUpdate = (row) => {
    dispatch(
      setDrawerComponent({
        DrawerComponentChild: InlineEditForm,
      })
    );
    dispatch(setSelectedContact({ contactDetails: row }));
    dispatch(openDrawer({ drawerOpen: true }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSearch = (e) => {
    const filtered = contactsData.filter(
      (item) =>
        item.firstName.toLowerCase().indexOf(e.target.value.toLowerCase()) >
          -1 ||
        item.lastName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );

    setFilteredData(filtered);
  };

  const isSelected = (contactId) => selected.indexOf(contactId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  useEffect(() => {
    dispatch(fetchPosts(user?.userId));
    dispatch(fetchStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredData(contactsData);
  }, [contactsData]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          handleSearch={handleSearch}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 800 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.contactId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.contactId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.contactId}
                      selected={isItemSelected}
                      padding="none"
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row.contactId)}
                        /> */}
                        <EditIcon onClick={() => onEditClick(row)}></EditIcon>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <a href="#" onClick={() => onUpdate(row)}>
                          {" "}
                          {row.firstName + " " + row.lastName}
                        </a>
                      </TableCell>
                      <TableCell align="left">{row.brand}</TableCell>
                      <TableCell align="left">{row.STATUS}</TableCell>
                      <TableCell align="left">{row.dealerShipName}</TableCell>
                      <TableCell align="left">{row.locations}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">
                        {row.serviceInterestedIn ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="left">
                        {row.otherGroupAffiliation}
                      </TableCell>
                      <TableCell align="left">{row.keyContactPerson}</TableCell>
                      <TableCell align="left">{row.mobile}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        {row.otherBrandAssociation}
                      </TableCell>
                      <TableCell align="left">{row.otherBrandRegion}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
