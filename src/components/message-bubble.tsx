import {Box, Paper, Typography} from '@mui/material';
import type {MessageBubbleProps} from '../types/message.types.ts';
import {decodeHtml, formatTime, stringToColor} from './utils/utils.ts';

export const MessageBubble = ({ message, isOwnMessage }: MessageBubbleProps) => {
  const avatarColor = stringToColor(message.author);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isOwnMessage ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        mb: 1.5,
        gap: 1,
        px: { xs: 1, sm: 2 },
      }}
    >
      {/* Avatar */}
      <Box
        aria-hidden="true"
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: avatarColor,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {message.author.charAt(0).toUpperCase()}
      </Box>

      {/* Bubble */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: { xs: '75%', sm: '60%' },
          minWidth: 120,
          wordBreak: 'break-word',
          px: 2,
          py: 1,
          borderRadius: isOwnMessage ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          backgroundColor: isOwnMessage ? 'primary.main' : '#fff',
          color: isOwnMessage ? '#fff' : 'text.primary',
        }}
      >
        {!isOwnMessage && (
          <Typography variant="caption" component="p" sx={{ fontWeight: 700, color: avatarColor, mb: 0.25 }}>
            {message.author}
          </Typography>
        )}
        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
          {decodeHtml(message.message)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'right',
            mt: 0.5,
            opacity: 0.7,
            fontSize: '0.65rem',
          }}
        >
          {formatTime(message.createdAt)}
        </Typography>
      </Paper>
    </Box>
  );
};
