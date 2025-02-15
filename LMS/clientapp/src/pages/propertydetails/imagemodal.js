import React from "react";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, DialogContent, Slide } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector, useDispatch } from "react-redux";
import { openImageModal } from "./../../store/reducers/propertydetails";
import UserService from './../../services/UserService'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageModal({ files, setFiles }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { imageModalOpen } = useSelector((state) => state.propertydetails);
    const dispatch = new useDispatch();

    const handleClose = () => {
        dispatch(openImageModal({ imageModalOpen: false }))
    };

    const deletePhoto = async () => {
     
        const file = files[currentIndex];
        await UserService.deletePhoto(file.img);
        const filesdata = await UserService.getPropertyFiles(file.propertyId);
        debugger;
        setFiles(filesdata);
    };

    const handleSlideChange = (index) => {
        setCurrentIndex(index);
    };


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <React.Fragment>
           
            <Dialog
                fullScreen
                open={imageModalOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: "#fff" }} elevation={0}>
                    <Toolbar>
                       
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                           
                        </Typography>
                        <Button autoFocus color="inherit" onClick={deletePhoto}>
                            Delete Photo
                        </Button>
                        <IconButton aria-label="share">
                            <ShareIcon sx={{ color: 'action.default' }} />
                        </IconButton>
                        <IconButton
                            edge="end"
                            color="black"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
                    <div className="slider-container">
                        <Carousel onChange={handleSlideChange} dynamicHeight={false}  interval="10000" transitionTime="1000" infiniteLoop>
                            {files.map((item, i) => (
                                <div key={item.id}>
                                    <img
                                        src={item.img}
                                        alt=""
                                        style={{ width: windowWidth > 768 ? "600px" : "100%" }}
                                    />
                                    <p className="legend">{item.title}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}




