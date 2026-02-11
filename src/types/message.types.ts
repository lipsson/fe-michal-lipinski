export type Message = {
    id: string;
    message: string;
    author: string;
    timestamp: string;
}

export type MessagesResponse  ={
    messages: Message[];
}

export type SendMessagePayload = {
    message: string;
    author: string;
}


export type MessageBubbleProps = {
    message: Message;
    isOwnMessage: boolean;
}

export type MessageListProps = {
    messages: Message[];
    currentUser: string;
    isLoading: boolean;
    isError: boolean;
}

export type MessageInputProps = {
    onSend: (text: string) => void;
    disabled?: boolean;
}
