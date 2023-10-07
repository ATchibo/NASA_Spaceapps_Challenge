import React, {useEffect, useRef} from 'react';
import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";
import {useIntl} from "react-intl";
import {Message} from "./MainChat";

type TextAreaProps = {
    messageQueue: Message[]
}

const TextArea = ({messageQueue}: TextAreaProps) => {

    const intl = useIntl();

    const SENDER_TYPE_BOT = intl.formatMessage({id: "sender_type_bot"})
    const SENDER_TYPE_USER = intl.formatMessage({id: "sender_type_user"})

    const messageBubbles = messageQueue.map((m: Message) => {
        if (m.sender === SENDER_TYPE_BOT) {
            return <BotChatBubble key={messageQueue.indexOf(m)} message={m.content}/>
        } else if (m.sender === SENDER_TYPE_USER) {
            return <UserChatBubble key={messageQueue.indexOf(m)} message={m.content}/>
        } else {
            return <p>No message found</p>
        }
    });

    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messageBubbles]);

    return (
        <div
            ref={messagesRef}
            className="
                overflow-y-scroll
                pl-2
                pr-2
            "
        >
            {messageBubbles}
        </div>
    );
};

export default TextArea;
