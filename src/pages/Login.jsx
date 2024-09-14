import { Box, Button } from "@mui/material";
import { useAuth } from "../hooks";

export const Login = () => {
    const authService = useAuth();
    return (
        <Box>
            <h1>Please login before continuing</h1>
            <Button onClick={authService.beginYahooAuth}>Log in</Button>
        </Box>
    );
};