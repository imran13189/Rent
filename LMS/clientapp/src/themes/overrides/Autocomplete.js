// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function Autocomplete(theme) {
    return {
        MuiAutocomplete: {
            styleOverrides: {
               
                notchedOutline: {
                    borderColor: theme.palette.grey[300]
                },
                root: {
                    '& .MuiOutlinedInput-root': {
                        padding: 3
                    }
                },
                inputSizeSmall: {
                    padding: '7.5px 8px 7.5px 12px'
                },
                inputMultiline: {
                    padding: 0
                }
            }
        }
    };
}
