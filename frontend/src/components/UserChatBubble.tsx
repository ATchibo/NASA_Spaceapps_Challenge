import React from 'react';
import {Card} from "flowbite-react";

type UserChatBubbleProps = {
    message?: string
}

const UserChatBubble = ({message}: UserChatBubbleProps) => {
    return (
        <Card
            className="
                w-min
                max-w-[calc(100%-15rem)]
                bg-cyan-700
                mt-2
                mb-2
                ml-auto
                justify-end
            "
        >
            <p className="text-white">
                {message || "Nothing"}
            </p>
        </Card>
    );
};

export default UserChatBubble;
