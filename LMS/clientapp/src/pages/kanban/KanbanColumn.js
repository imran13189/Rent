import React from "react";
import KanbanTask from "./KanbanTask";
import "./KanbanColumn.css";
import { Droppable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
const KanbanColumn = (props) => {
  return (
    <Grid
          className="KanbanColumn"
          item
          xs={8}
          lg={12}
          sx={{ bgcolor: '#fafafb' }}
    >
      <div className="KanbanColumn-main">
        <h2 className="KanbanColumn-name">{props.columnData.StatusName}</h2>
        <Droppable
          droppableId={`${props.columnData.StatusId - 1}`}
          StatusId={`${props.columnData.StatusId}`}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="KanbanColumns-tasks-container"
              {...provided.droppableProps}
            >
              {props.columnData.taskIds.map((task, index) => {
                return (
                  <KanbanTask
                    key={task.ContactId}
                    id={task.ContactId}
                    task={task}
                    color={props.columnData.color}
                    index={index}
                    // removeTask={props.removeTask}
                    // editTask={props.editTask}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Grid>
  );
};

export default KanbanColumn;
