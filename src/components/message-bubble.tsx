import { Box, Typography, Paper } from "@mui/material";
import type { MessageBubbleProps} from "../types/message.types.ts";


function formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 55%, 55%)`;
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
    const avatarColor = stringToColor(message.author);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isOwnMessage ? "row-reverse" : "row",
                alignItems: "flex-end",
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
                    borderRadius: "50%",
                    backgroundColor: avatarColor,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                    maxWidth: { xs: "75%", sm: "60%" },
                    px: 2,
                    py: 1,
                    borderRadius: isOwnMessage
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    backgroundColor: isOwnMessage ? "primary.main" : "#fff",
                    color: isOwnMessage ? "#fff" : "text.primary",
                }}
            >
                {!isOwnMessage && (
                    <Typography
                        variant="caption"
                        component="p"
                        sx={{ fontWeight: 700, color: avatarColor, mb: 0.25 }}
                    >
                        {message.author}
                    </Typography>
                )}
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {message.message}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
                        opacity: 0.7,
                        fontSize: "0.65rem",
                    }}
                >
                    {formatTime(message.timestamp)}
                </Typography>
            </Paper>
        </Box>
    );
}
