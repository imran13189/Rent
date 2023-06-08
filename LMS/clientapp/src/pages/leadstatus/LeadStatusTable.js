import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

import EditIcon from "@mui/icons-material/Edit";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStatus, fetchLeadStatus } from "./../../store/reducers/masters";
import { openDrawer } from "./../../store/reducers/drawer";
import { useEffect, useState } from "react";
import Search from "../../layout/MainLayout/Header/HeaderContent/Search";
import { stableSort, getComparator, EnhancedTableHead } from './../../utils/TableSettings';
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import MasterService from "../../services/MasterService";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}


const headCells = [
    { id: "StatusName", label: "Status Name" },
    { id: "actions", label: "Action" },
    
];



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
                                    setSelectedStatus({
                                        leadStatusDetails: {
                                        StatusName: "",
                                        StatusId: 0,
                                        StatusOrder:0
                                    },
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

export default function LeadStatusTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const dispatch = useDispatch();
    const { leadStatusData } = useSelector((state) => state.masters);
    const [filteredData, setFilteredData] = useState([]);
    // const { drawerOpen,contactDetails } = useSelector((state) => state.contact);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = leadStatusData.map((n) => n.userId);
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
        dispatch(setSelectedStatus({ leadStatusDetails: row }));
        dispatch(openDrawer({ drawerOpen: true }));
    };

    const onDelete = async (row) => {
         
        row = { ...row, isDeleted: true }
        const data = await MasterService.SaveStatus(row).then((res) => {
            dispatch(fetchLeadStatus());
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    

    const handleSearch = (e) => {
        const filtered = leadStatusData.filter(
            (item) =>
                item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
                item.email.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        );

        setFilteredData(filtered);
    };

    const isSelected = (contactId) => selected.indexOf(contactId) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData?.length) : 0;

    useEffect(() => {
        dispatch(fetchLeadStatus());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilteredData(leadStatusData);
    }, [leadStatusData]);

    //const [items, setItems] = useState(getItems(10));

    const reorder = (
        list,
        startIndex,
        endIndex
    ) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const onDragEnd = ({ destination, source }) => {
        // dropped outside the list

        if (!destination) return;

        const newItems = reorder(filteredData, source.index, destination.index);
      
        setFilteredData(newItems);
        updateOrder(newItems);
    };

    const updateOrder = async (list) => {
        const data = await MasterService.SaveStatusOrder(list);
         
    }


    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar handleSearch={handleSearch} numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
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
                            headCells={headCells}
                        />

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable-list">

                                {(provided) => (
                                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>

                                        {stableSort(filteredData, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.userId);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <Draggable draggableId={"draggable-" + row.StatusId} key={"draggable-" + row.StatusId} index={index}>
                                                        {(provided, snapshot) => (
                                                            <TableRow
                                                                hover
                                                                // onClick={(event) => handleClick(event, row.contactId)}
                                                                role="checkbox"
                                                                aria-checked={isItemSelected}
                                                                tabIndex={-1}
                                                                key={String(row.StatusId)}
                                                                selected={isItemSelected}
                                                                padding="none"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{
                                                                    background: snapshot.isDragging
                                                                        ? "green"
                                                                        : "",
                                                                    color: snapshot.isDragging
                                                                        ? "#fff"
                                                                        : "#000",
                                                                }}
                                                            >

                                                                <TableCell
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    <a href="#" onClick={() => onEditClick(row)}>
                                                                        {row.StatusName}
                                                                    </a>

                                                                </TableCell>

                                                                <TableCell
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    <DeleteOutlinedIcon color="error" onClick={() => onDelete(row)}></DeleteOutlinedIcon>

                                                                </TableCell>


                                                            </TableRow>
                                                        )}
                                                    </Draggable>
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
                                )}
                            </Droppable>
                        </DragDropContext>



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

        </Box>
    );
}
