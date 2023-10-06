import React from 'react';
import {Button, TextInput} from "flowbite-react";
import {AiOutlineSend} from "react-icons/ai"

const MessageInputBox = () => {
    return (
        <div
            className="
                align-bottom
                mt-auto
                flex
                w-[calc(100%)]
            "
        >
            <TextInput
                className="
                    w-[calc(100%)]
                "
            />
            <Button
                className="
                    ml-2
                    p-0
                "
            >
                <AiOutlineSend size='1.2em'/>
            </Button>
        </div>
    );
};

export default MessageInputBox;
