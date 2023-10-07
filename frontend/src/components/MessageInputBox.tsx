import React from 'react';
import {Button, TextInput} from "flowbite-react";
import {AiOutlineSend} from "react-icons/ai"

type MessageInputBoxProps = {
    sendMessage: any;
    msg: string;
    setMsg: any;
    canSend: boolean;
}

const MessageInputBox = ({sendMessage, msg, setMsg, canSend}: MessageInputBoxProps) => {

    const onMsgChange = (event: any) => {
        setMsg(event.target.value);
    }

    return (
        <form
            className="
                align-bottom
                mt-auto
                flex
                w-[calc(100%)]
            "
            onSubmit={sendMessage}
        >
            <TextInput
                className="
                    w-[calc(100%)]
                "
                value={msg}
                onChange={onMsgChange}
            />
            <Button
                className="
                    ml-2
                    p-0
                "
                type="submit"
                // disabled={canSend}
            >
                <AiOutlineSend size='1.2em'/>
            </Button>
        </form>
    );
};

export default MessageInputBox;
