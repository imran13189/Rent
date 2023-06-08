// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
    return {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: '0.8rem',
                    padding: 12,
                    borderColor: theme.palette.divider
                },
                head: {
                    fontWeight: 600,
                    paddingTop: 20,
                    paddingBottom: 20
                }
            }
        }
    };
}
