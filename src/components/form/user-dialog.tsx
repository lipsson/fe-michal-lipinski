import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import type {FC} from "react";

type UserDialogProps = {
    username: string;
    onClose: () => void;
    onChange: (username: string) => void;
    onKeyDown: () => void;
}
export const UserDialog: FC<UserDialogProps> = (props) => {
    const {username, onChange, onKeyDown, onClose} = props;
    return (
        <Dialog open={true} disableEscapeKeyDown>
            <DialogTitle>Welcome to the chat! 👋</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    label="Your name/nickname"
                    margin="dense"
                    value={username}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onKeyDown()}
                />
            </DialogContent>
            <DialogActions>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Button onClick={onClose} variant={'outlined'}>Cancel</Button>
                    <Button onClick={onKeyDown} variant={'contained'} disabled={!username.trim()}>
                        Join
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
