import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <LockOutlinedIcon sx={{ fontSize: 50, color: "#d02943" }} />
                <Typography variant="h4" color="#d02943">
                    Unauthorized Access
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    You do not have permission to view this page.
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/mylisting")}
                        sx={{ mr: 2 ,bgcolor: 'action.main' }}
                    >
                        Go Back
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
                        Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
