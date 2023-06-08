import React, { useEffect, useState } from "react";
import { columnsRawData } from "./KanbanData";
import KanbanColumn from "./KanbanColumn";
import "./Kanban.css";
import KanbanModal from "./KanbanModal";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanSidebar from "./KanbanSidebar";
import { useAuth } from "./../../routes/AuthProvider";
import ContactService from "./../../services/ContactService";
import { fetchDashboardPosts } from "./../../store/reducers/users";
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //paddingLeft:theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow:'none'
}));

const Kanban = (props) => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const updateContact = (statusId, contactId) => {
        const values = { statusId: parseInt(statusId) + 1, contactId: contactId };

        const data = ContactService.UpdateContact(values).then((response) => {
            dispatch(fetchDashboardPosts(user?.userId));
        });
    };
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        console.log(result);
        if (!destination) {
            console.log("no destination");
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log("index and destination the same");
            return;
        }

        const start = props.columns[source.droppableId];
        const finish = props.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            const swapTask = newTaskIds[source.index];
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, swapTask);

            const newColumnsState = props.columns.map((c) => {
                if (c.StatusId === start.StatusId) {
                    c.taskIds = newTaskIds;
                    return c;
                } else return c;
            });

            const newColumnsState2 = [...newColumnsState];
            props.setColumns(newColumnsState2);
        } else {
            if (finish.taskIds.length < finish.limit) {
                const startTaskIds = Array.from(start.taskIds);
                const [item] = startTaskIds.splice(source.index, 1);

                const finishTaskIds = Array.from(finish.taskIds);
                finishTaskIds.splice(destination.index, 0, item);

                const newColumnsState = props.columns.map((c) => {
                    if (c.StatusId === start.StatusId) {
                        c.taskIds = startTaskIds;
                        return c;
                    } else if (c.StatusId === finish.StatusId) {
                        c.taskIds = finishTaskIds;
                        return c;
                    } else return c;
                });
                const newColumnsState2 = [...newColumnsState];
                props.setColumns(newColumnsState2);
                updateContact(destination.droppableId, draggableId);
            } else return;
        }
    };

    const openModal = (data) => {
        const columnId = data.id;
        setModal(columnId);
    };

    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        // ContactService.GetKanbanData(user?.userId).then((response) => {
        //   setColumns(response);
        // });

        dispatch(fetchDashboardPosts(user?.userId));
    }, []);

    return (
        <>
            {/* <KanbanSidebar /> */}
            <DragDropContext onDragEnd={onDragEnd} >
                <div className="Kanban" sx={{ bgcolor: '#fafafb' }}>
                    {modal && (
                        <KanbanModal
                            closeModal={closeModal}
                            //addTask={addTask}
                            columnData={modal}
                        />
                    )}
                    {/* <h1 className="Kanban-title">Kanban</h1> */}

                    <div container className="kanban-div">
                        {props.columns &&
                            props.columns.map((c) => {
                                return (

                                    <Item sx={{ bgcolor: '#fafafb' }}>
                                        <KanbanColumn
                                            columnData={c}
                                            key={c.name}
                                            openModal={openModal}
                                        // removeTask={removeTask}
                                        // editTask={editTask}
                                        />
                                    </Item>

                                );
                            })}
                    </div>
                </div>
            </DragDropContext>
        </>
    );
};

export default Kanban;
