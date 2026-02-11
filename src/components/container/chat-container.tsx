import { useState } from "react";
import {
    Box,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import {useMessages} from "../../hooks/useMessages.hook.ts";
import {MessageInput} from "../form/message-input.tsx";
import {MessageList} from "../message-list.tsx";

const USERNAME_KEY = "chat_username";

function getStoredUsername(): string {
    return localStorage.getItem(USERNAME_KEY) ?? "";
}

export function ChatContainer() {
    const [username, setUsername] = useState(getStoredUsername);
    const [usernameInput, setUsernameInput] = useState("");
    const { messages, isLoading, isError, sendMessage, isSending } = useMessages();

    const showNameDialog = !username;

    const handleSetUsername = () => {
        const trimmed = usernameInput.trim();
        if (!trimmed) return;
        localStorage.setItem(USERNAME_KEY, trimmed);
        setUsername(trimmed);
    };

    const handleSend = (text: string) => {
        sendMessage({ message: text, author: username });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100dvh",
                backgroundColor: "background.default",
                p: { xs: 0, sm: 2 },
            }}
        >
            {/* Username dialog */}
            <Dialog open={showNameDialog} disableEscapeKeyDown>
                <DialogTitle>Witaj w czacie! 👋</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Twoje imię / nick"
                        margin="dense"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSetUsername()}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSetUsername} disabled={!usernameInput.trim()}>
                        Dołącz
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Chat window */}
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 600,
                    height: { xs: "100dvh", sm: "85dvh" },
                    maxHeight: 800,
                    overflow: "hidden",
                    borderRadius: { xs: 0, sm: 3 },
                }}
            >
                {/* Header */}
                <AppBar position="static" elevation={0} sx={{ borderRadius: { xs: 0, sm: "12px 12px 0 0" } }}>
                    <Toolbar variant="dense">
                        <ChatIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h1" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                            Czat
                        </Typography>
                        {username && (
                            <Typography
                                variant="caption"
                                sx={{ ml: "auto", opacity: 0.8 }}
                            >
                                {username}
                            </Typography>
                        )}
                    </Toolbar>
                </AppBar>

                {/* Messages */}
                <MessageList
                    messages={messages}
                    currentUser={username}
                    isLoading={isLoading}
                    isError={isError}
                />

                {/* Input */}
                <MessageInput onSend={handleSend} disabled={isSending || !username} />
            </Paper>
        </Box>
    );
}
