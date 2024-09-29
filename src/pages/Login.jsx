import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { IoLogoYahoo } from "react-icons/io5";

import { useAuth } from "../hooks";

export const Login = () => {
    const authService = useAuth();
    const theme = useTheme();

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', paddingX: 3}}>
            
            <Button sx={{
                    display: 'flex', 
                    height: 36, 
                    backgroundColor: theme.palette.primary.main,
                    borderRadios: '5px',
                    color: '#FFFFFF',
                    paddingX: 1.5,
                    paddingY: 0, 
                    alignItems: 'center',
                    gap: 1.5
                }}
                onClick={authService.beginYahooAuth}
            >   
                
                <IoLogoYahoo size={16}/>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', height: '100%' }} />
                <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Typography color="#FFFFFF" fontWeight={600} fontSize={14}>
                        Continue with Yahoo
                    </Typography>
                </Box>
                
            </Button>
        </Box>
    );
};