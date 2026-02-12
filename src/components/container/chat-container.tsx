import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import { useMessages } from '../../hooks/useMessages.hook.ts';
import { Header } from '../form/header.tsx';
import { MessageInput } from '../form/message-input.tsx';
import { UserDialog } from '../form/user-dialog.tsx';
import { MessageList } from '../message-list.tsx';

const USERNAME_KEY = '';

function getStoredUsername(): string {
  return localStorage.getItem(USERNAME_KEY) ?? '';
}

export const ChatContainer = () => {
  const [username, setUsername] = useState(getStoredUsername);
  const [usernameInput, setUsernameInput] = useState('');
  const { messages, isLoading, isError, sendMessage, isSending } = useMessages();

  const [showNameDialog, setShowNameDialog] = useState(!username);

  const handleClose = () => setShowNameDialog(false);

  const handleSetUsername = () => {
    const trimmed = usernameInput.trim();
    if (!trimmed) return;
    localStorage.setItem(USERNAME_KEY, trimmed);
    setUsername(trimmed);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem(USERNAME_KEY);
    setUsername('');
    setUsernameInput('');
  };

  const handleSend = (text: string) => {
    sendMessage({ message: text, author: username });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
        backgroundColor: 'background.default',
        p: { xs: 0, sm: 2 },
      }}
    >
      {showNameDialog && (
        <UserDialog
          username={usernameInput}
          onClose={handleClose}
          onChange={setUsernameInput}
          onKeyDown={handleSetUsername}
        />
      )}

      {/* Chat window */}
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 600,
          height: { xs: '100dvh', sm: '85dvh' },
          maxHeight: 800,
          overflow: 'hidden',
          borderRadius: { xs: 0, sm: 3 },
        }}
      >
        {/* Header */}
        <Header username={username} handleLogout={handleLogout} handleLogin={() => setShowNameDialog(true)} />

        {/* Messages */}
        <MessageList messages={messages} currentUser={username} isLoading={isLoading} isError={isError} />

        {/* Input */}
        <MessageInput onSend={handleSend} disabled={isSending || !username} />
      </Paper>
    </Box>
  );
};
