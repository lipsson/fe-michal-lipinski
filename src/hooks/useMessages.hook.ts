import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchMessages, sendMessage} from "../api/messages";
import type {Message, SendMessagePayload} from "../types/message.types.ts";


const MESSAGES_KEY = ["messages"] as const;
const POLL_INTERVAL = 3000;

export function useMessages() {
    const queryClient = useQueryClient();

    const messagesQuery = useQuery({
        queryKey: MESSAGES_KEY,
        queryFn: () => fetchMessages(),
        refetchInterval: POLL_INTERVAL,
        select: (messages: Message[]) =>
            [...messages].sort(
                (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            ),
    });

    const sendMutation = useMutation({
        mutationFn: (payload: SendMessagePayload) => sendMessage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: MESSAGES_KEY});
        },
    });

    return {
        messages: messagesQuery.data ?? [],
        isLoading: messagesQuery.isLoading,
        isError: messagesQuery.isError,
        error: messagesQuery.error,
        sendMessage: sendMutation.mutate,
        isSending: sendMutation.isPending,
    };
}
