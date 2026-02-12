import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import type {FC} from "react";

type HeaderProps = {
    username: string
    handleLogout: () => void
    handleLogin: () => void
}
export const Header: FC<HeaderProps> = (props) => {
    const {username, handleLogout, handleLogin} = props

    return (
        <AppBar position="static" elevation={0} sx={{borderRadius: {xs: 0, sm: "12px 12px 0 0"}}}>
            <Toolbar variant="dense">
                <ChatIcon sx={{mr: 1}}/>
                <Typography variant="h6" component="h1" sx={{fontSize: "1rem", fontWeight: 600}}>
                    Chat
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <Typography
                        variant="caption"
                        sx={{ml: "auto", opacity: 0.8}}
                    >
                        {username}
                    </Typography>
                    <Toolbar title="Logout">
                        <IconButton onClick={username ? handleLogout : handleLogin}
                                    sx={{color: username ? 'error.light' : 'common.white'}}>
                            {username ? <LogoutIcon/> : <LoginIcon/>}
                        </IconButton>
                    </Toolbar>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
