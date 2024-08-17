
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import { openImageModal } from "./../../store/reducers/propertydetails";
import { useSelector, useDispatch } from "react-redux";
import UserService from './../../services/UserService'
import { useEffect } from 'react';
import { useState } from 'react';
import {

    useParams
} from "react-router-dom";

import ImageModal from './imagemodal';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const ImageListItemWithStyle = styled(ImageListItem)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
        opacity: 0.8,
       
        //boxShadow: `5px 10px ${theme.palette.primary.main}`,

    },
}));

export default function Gallery() {

    const [files, setFiles] = useState([{}]);
    const params = useParams();
    const dispatch = new useDispatch();


    useEffect(() => {

        if (params.id) {
            const fetchData = async () => {
                const filesdata = await UserService.getPropertyFiles(params.id);
                setFiles(filesdata);
            }
            fetchData();
        }              

    }, [])

    return (
        <>
        <ImageList
            sx={{ width: '100%' }}
            variant="quilted"
            cols={4}
            rowHeight={100}
        >
            {files.map((item,i) => (
                <ImageListItemWithStyle onClick={()=>dispatch(openImageModal({ imageModalOpen:true }))} key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 500, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItemWithStyle>
            ))}
        </ImageList>
            <ImageModal files={files}></ImageModal>
        </>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 4,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        rows: 2,
        cols: 1
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        rows: 2,
        cols: 1
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        rows: 2,
        cols: 1
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        rows: 2,
        cols: 1
    }
   
    
];