import React from 'react';
import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

const TextArea = () => {
    return (
        <div
            className="
                overflow-y-scroll
            "
        >

            <BotChatBubble />
            <UserChatBubble />

        </div>
    );
};

export default TextArea;
