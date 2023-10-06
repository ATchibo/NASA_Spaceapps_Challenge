import React from 'react';
import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";
import {Message} from "./MainChat";
import {useIntl} from "react-intl";

type TextAreaProps = {
    messageQueue: Message[]
}

const TextArea = ({messageQueue}: TextAreaProps) => {

    const intl = useIntl();

    const senderTypeBot = intl.formatMessage({id: "sender_type_bot"})
    const senderTypeUser = intl.formatMessage({id: "sender_type_user"})

    const messageBubbles = messageQueue.map((m: Message) => {
        if (m.sender == senderTypeBot) {
            return <BotChatBubble key={messageQueue.indexOf(m)} message={m.content}/>
        } else if (m.sender == senderTypeUser) {
            return <UserChatBubble key={messageQueue.indexOf(m)} message={m.content}/>
        } else {
            return <p>No message found</p>
        }
    });

    return (
        <div
            className="
                overflow-y-scroll
            "
        >
            {messageBubbles}
        </div>
    );
};

export default TextArea;
