import {Box, CircularProgress, Typography} from "@mui/material";
import {useEffect, useRef} from "react";
import type {MessageListProps} from "../types/message.types.ts";
import {MessageBubble} from "./message-bubble.tsx";

export const MessageList = ({
                                        messages,
                                        currentUser,
                                        isLoading,
                                        isError,
                            }: MessageListProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Auto-scroll only when user is near the bottom
        const isNearBottom =
            container.scrollHeight - container.scrollTop - container.clientHeight < 150;

        if (isNearBottom) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Typography color="error">The message failed to load. Check your API connection!💥 </Typography>
            </Box>
        );
    }

    return (
        <Box
            ref={containerRef}
            role="log"
            aria-label="Historia czatu"
            aria-live="polite"
            sx={{
                flex: 1,
                overflowY: "auto",
                py: 2,
            }}
        >
            {messages.length === 0 && (
                <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
                    No messages. Write the first one!💬
                </Typography>
            )}
            {messages.map((msg) => (
                <MessageBubble
                    key={msg._id}
                    message={msg}
                    isOwnMessage={msg.author === currentUser}
                />
            ))}
            <div ref={bottomRef} />
        </Box>
    );
}
