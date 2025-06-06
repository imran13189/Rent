
import { ImageList, ImageListItem, Box, Typography, ImageListItemBar }  from '@mui/material';
import { styled } from '@mui/material/styles';
import { openImageModal } from "./../../store/reducers/propertydetails";
import { useSelector, useDispatch } from "react-redux";
import UserService from './../../services/UserService'
import { useEffect } from 'react';
import { useState } from 'react';
import PhotoModal from "./../property/PhotoModal"
import {

    useParams
} from "react-router-dom";

import ImageModal from './imagemodal';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const ImageListItemWithStyle = styled(ImageListItem)(({ theme }) => ({
    "&:hover .MuiImageListItemBar-root": {
        cursor: "pointer",
        opacity: 0.8,
       
        //boxShadow: `5px 10px ${theme.palette.primary.main}`,

    },
}));

export default function Gallery() {

    const [files, setFiles] = useState([{}]);
    const [openPhotoModal, setPhotoModal] = useState(false);
    const params = useParams();
    const dispatch = new useDispatch();
    const { userDetails } = useSelector((state) => state.users);
    const { userProperty } = useSelector((state) => state.property);


    useEffect(() => {
       
        if (userProperty?.propertyId) {
            const fetchData = async () => {
                const filesdata = await UserService.getPropertyFiles(userProperty?.propertyId);
                setFiles(filesdata);
            }
            fetchData();
        }

    }, [userProperty])

    return (
        <>
            <ImageList
                sx={{ width: '100%' }}
                variant="quilted"
                cols={4}
                rowHeight={100}
            >
                {files.length>0?files.slice(0, 3).map((item, i) => (
                    <ImageListItemWithStyle onClick={() => dispatch(openImageModal({ imageModalOpen: true }))} key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 500, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title="See More"

                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(0, 0, 0, 0.5)',
                                opacity: 0, // Initially hidden
                                transition: 'opacity 0.3s ease-in-out', // Smooth transition
                                width: '100%', // Optional: Adjust width as needed
                                height: '100%',
                                textAlign: 'center', // Center the text
                            }}

                           
                        />


                    </ImageListItemWithStyle>

                )) : (
                        <ImageListItemWithStyle >
                        </ImageListItemWithStyle>
                ) }

                {(userDetails?.userId == userProperty?.userId) && <ImageListItemWithStyle onClick={() => setPhotoModal(true)} cols={2 || 1} rows={2 || 1}>
                    <img
                        {...srcset("https://sipaz.in/Files/4/0.jpg", 500, 4, 4)}
                        alt="ok"
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title="Add More"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0, 0, 0, 0.5)',

                            //transition: 'opacity 0.3s ease-in-out', // Smooth transition
                            width: '100%', // Optional: Adjust width as needed
                            height: '100%',
                            textAlign: 'center', // Center the text
                        }}

                    />
                </ImageListItemWithStyle>}

            </ImageList>

            <ImageModal files={files} setFiles={setFiles}></ImageModal>
            <PhotoModal open={openPhotoModal} setOpen={setPhotoModal} propertyId={params.id} setFiles={setFiles }> </PhotoModal>
        </>
    );
}

