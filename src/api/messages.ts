import axios from "axios";
import type {Message, MessagesResponse, SendMessagePayload} from "../types/message.types.ts";


const PORT = import.meta.env.VITE_API_PORT ?? 5174;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? `http://localhost:${PORT}`,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN ?? "super-secret-doodle-token"}`,
        "Content-Type": "application/json",
    },
});

export async function fetchMessages(after?: string, limit = 50): Promise<Message[]> {
    const params: Record<string, string | number> = { limit };
    if (after) {
        params.after = after;
    }
    const { data } = await api.get<MessagesResponse>("/api/v1/messages", { params });
    return data.messages;
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
    const { data } = await api.post<Message>("/api/v1/messages", payload);
    return data;
}
