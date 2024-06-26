// material-ui
import { useState, useEffect } from 'react';
// project import
import SearchProperty from './SearchProperty';
import PropertyList from './PropertyList';
import { fetchProperties, locationSearch } from "./../../store/reducers/property";
// ================================|| REGISTER ||================================ //
import { useDispatch, useSelector } from "react-redux";

const Index = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = new useDispatch();
    const { selectedLocation,properties } = useSelector((state) => state.property);
   
    const handleLoadMore = () => {
       
        dispatch(locationSearch({ ...selectedLocation, page:selectedLocation?.page+1 }));
        //dispatch(fetchProperties(selectedLocation)); 
    };


    useEffect(() => {
       
        if (selectedLocation) {
            dispatch(fetchProperties(selectedLocation));
        }

    }, [selectedLocation]);


   
   
    return (
        <>
            <SearchProperty></SearchProperty>
            <PropertyList></PropertyList>
            {!loading&& properties?.length>0 && (
                <button onClick={handleLoadMore} disabled={loading}>
                    Load More
                </button>
            )}
        </>
    );
}

export default Index;
