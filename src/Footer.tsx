
import { Box, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';

const Footer = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar variant="dense">
                    <Typography fontSize={"small"}>
                        ProtoPedia Card is developed by botamochi, and depending on ProtoPedia API
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}


export default Footer;