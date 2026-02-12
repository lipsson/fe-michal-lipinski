import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from '@mui/material';
import { type KeyboardEvent, type SyntheticEvent, useState } from 'react';
import type { MessageInputProps } from '../../types/message.types.ts';

export const MessageInput = ({ onSend, disabled }: MessageInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        p: { xs: 1, sm: 2 },
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#fff',
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        size="small"
        placeholder="Napisz wiadomość…"
        aria-label="Pole wiadomości"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
      />
      <IconButton
        type="submit"
        color="primary"
        aria-label="Wyślij wiadomość"
        disabled={disabled || !text.trim()}
        sx={{
          width: 44,
          height: 44,
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};
