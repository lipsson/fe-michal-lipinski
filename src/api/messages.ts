import type {Message, MessagesResponse, SendMessagePayload} from '../types/message.types.ts';
import {httpClient} from './httpClient.ts';

export async function fetchMessages(after?: string, limit = 50): Promise<Message[]> {
  const params: Record<string, string | number> = { limit };
  if (after) {
    params.after = after;
  }

  const { data } = await httpClient.get<MessagesResponse>('/api/v1/messages', { params });

  return data;
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
  const { data } = await httpClient.post<Message>('/api/v1/messages', payload);
  return data;
}
