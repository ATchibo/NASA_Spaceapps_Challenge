import React from 'react';
import {Card} from "flowbite-react";

type BotChatBubbleProps = {
    message?: string
}

const BotChatBubble = ({message}: BotChatBubbleProps) => {
    return (
        <Card
            className="
                w-min
                max-w-[calc(100%-15rem)]
                {/*bg-cyan-700*/}
                bg-gray-200
                mt-2
                mb-2
            "
        >
            <p className="text-gray-900">
                {message || "Nothing"}
            </p>
        </Card>
    );
};

export default BotChatBubble;
