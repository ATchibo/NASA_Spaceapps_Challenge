import React from 'react';
import {Card, Spinner} from "flowbite-react";
//@ts-ignore
import SanitizedHTML from 'react-sanitized-html';

type BotChatBubbleProps = {
    message?: string
}

const BotChatBubble = ({message}: BotChatBubbleProps) => {

    console.log("msg in chat bubble", message);

    return (
        <Card
            className="
                inline-flex
                max-w-[calc(100%-15rem)]
                bg-gray-200
                mt-2
                mb-2
            "
        >
            {/*<p className="text-gray-900">*/}
                {message && message.length > 0 ? <SanitizedHTML html={message}/> : <Spinner/>}
            {/*</p>*/}
        </Card>
    );
};

export default BotChatBubble;
