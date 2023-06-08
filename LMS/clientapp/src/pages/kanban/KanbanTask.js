import React, { useEffect } from "react";
import "./KanbanTask.css";
import { Draggable } from "react-beautiful-dnd";
import useToggle from "./useToggleState";
import KanbanEditForm from "./KanbanEditForm";
import { useDispatch, useSelector } from "react-redux";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PropTypes from "prop-types";
import { pink } from '@mui/material/colors';
import {
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Box,
  Menu,
  Chip,
  Grid,
    Stack,
    Radio,
    RadioGroup,
  FormControlLabel
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import ContactService from "./../../services/ContactService";
import {
  fetchDashboardPosts,
  fetchKanbanPost,
} from "./../../store/reducers/users";
import { useAuth } from "./../../routes/AuthProvider";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const KanbanTask = (
    props,
    { color, title, count, percentage, isLoss, extra }
) => {
    const [isEditing, toggle] = useToggle(false);
    const { statusData } = useSelector((state) => state.contact);
    const { search } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selectedValue, setSelectedValue] = React.useState({});
    const [alignment, setAlignment] = React.useState('web');


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeRadio = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleChange = (event, task) => {
         
        if (event.target.name == "StatusId") {
            task = { ...task, [event.target.name]: event.target.value }
        }
        if (event.target.name == "SubStatusId") {
            task = { ...task, [event.target.name]: event.target.value }
        }
        const values = {
            statusId: parseInt(task.StatusId),
            contactId: task.ContactId,
            subStatusId: parseInt(task.SubStatusId)
        };
        const data = ContactService.UpdateContact(values).then((response) => {
            dispatch(fetchKanbanPost({ userId: user?.userId, search: search }));
            dispatch(fetchDashboardPosts(user?.userId));
        });
       /* setAlignment(newAlignment);*/
    };

    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    };



    return (
        <Draggable
            draggableId={`${props.task.ContactId}`}
            key={`${props.task.ContactId}`}
            index={props.index}
        >
            {(provided, snapshot) => (
                <div>
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        sx={{ width:240, marginBottom: 1,textAlign:'start',p:0 }}

                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            pt={1}
                        >

                        </Box>
                        <CardHeader sx={{ pt:0,pb:0 }} avatar={<Avatar alt="Alias" sx={{ bgcolor: `${props.color}`, width: 30, height: 30 }}>
                            {props.task.Alias}
                        </Avatar>} title={props.task.Name} subheader={<MobileChip task={props.task } />} action={
                            <IconButton onClick={handleClick} aria-label="settings" aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}>
                            </IconButton>
                        } />
                      
                        <CardContent sx={{ pt: 1, pb: 0 }}>
                            <Typography  variant="body2" color="text.secondary">
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(e) => handleChange(e, props.task)}
                                    defaultValue=""
                                    sx={{ width:100, pt: 0, '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                                    displayEmpty
                                    value={props.task.StatusId}
                                    name="StatusId"
                                    
                                >
                                    <MenuItem value="">
                                        <em>Change Status</em>
                                    </MenuItem>
                                    {statusData?.map((item) => (
                                        <MenuItem
                                            ContactId={props.task.ContactId}
                                            value={item.StatusId}
                                        >
                                            {item.StatusName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={`${props.task.SubStatusId}`}
                                    exclusive
                                    onChange={(e,v) => handleChange(e,props.task)}
                                    aria-label="Platform"
                                    name="SubStatusId"
                                >
                                    <ToggleButton size="small" name="SubStatusId" color="info" value="1">Cold</ToggleButton>
                                    <ToggleButton size="small" name="SubStatusId" color="success" value="2">Warm</ToggleButton>
                                    <ToggleButton size="small" name="SubStatusId" color="error" value="3">Hot</ToggleButton>
                                </ToggleButtonGroup>
                            </Typography>
                        </CardContent>
                    </Card>
                   
                </div>
            )}
        </Draggable>
    );
};


const MobileChip = ({ task }) => {
    return (
        <div>
            <Stack direction="row" alignItems="center" gap={1}>
                {task?.MonthlySales && <span className="KanbanTask-number">&#8377;{task?.MonthlySales} &nbsp; &#x2022;</span>}  <span>{task?.BrandName}</span>
            </Stack>
        </div>
    )
}


KanbanTask.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

KanbanTask.defaultProps = {
  color: "primary",
};
export default KanbanTask;
