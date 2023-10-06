import React from 'react';
import {Card, Spinner} from "flowbite-react";

type BotChatBubbleProps = {
    message?: string
}

const BotChatBubble = ({message}: BotChatBubbleProps) => {
    return (
        <Card
            className="
                inline-flex
                max-w-[calc(100%-15rem)]
                {/*bg-cyan-700*/}
                bg-gray-200
                mt-2
                mb-2
            "
        >
            <p className="text-gray-900">
                {message || <Spinner/>}
            </p>
        </Card>
    );
};

export default BotChatBubble;
