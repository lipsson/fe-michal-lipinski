import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useMemo} from "react";
import {fetchMessages, sendMessage} from "../api/messages";
import type {SendMessagePayload} from "../types/message.types.ts";


const MESSAGES_KEY = ["messages"] as const;
const POLL_INTERVAL = 30000;

export function useMessages() {
    const queryClient = useQueryClient();

    const messagesQuery = useQuery({
        queryKey: MESSAGES_KEY,
        queryFn: () => fetchMessages(),
        refetchInterval: POLL_INTERVAL,
    });

    const sortedMessages = useMemo(() => {
        const data = messagesQuery.data ?? [];
        return [...data].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    }, [messagesQuery.data]);

    const sendMutation = useMutation({
        mutationFn: (payload: SendMessagePayload) => sendMessage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: MESSAGES_KEY});
        },
    });

    return {
        messages: sortedMessages,
        isLoading: messagesQuery.isLoading,
        isError: messagesQuery.isError,
        error: messagesQuery.error,
        sendMessage: sendMutation.mutate,
        isSending: sendMutation.isPending,
    };
}
