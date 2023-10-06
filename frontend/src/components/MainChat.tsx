import React, {useState} from 'react';
import {Card} from "flowbite-react";
import TextArea from "./TextArea";
import MessageInputBox from "./MessageInputBox";
import {useIntl} from "react-intl";

export type Message = {
    sender: string;
    content: string;
}

const MainChat = () => {

    const intl = useIntl();

    const [messageQueue, setMessageQueue] = useState<Message[]>([{
        sender: intl.formatMessage({id: "sender_type_bot"}),
        content: intl.formatMessage({id: "initial_msg_bot"})
    }]);


    const [currentMessage, setCurrentMessage] = useState("");
    const sendMessage = (event: any) => {
        event.preventDefault();

        console.log(currentMessage);
        setCurrentMessage("");
    }

    return (
        <Card
            className="
                ml-auto
                mr-auto
                max-w-7xl
                w-[calc(100%-2rem)]
                h-[calc(100vh-12rem)]
            "
        >
            <TextArea messageQueue={messageQueue}/>
            <MessageInputBox sendMessage={sendMessage} msg={currentMessage} setMsg={setCurrentMessage}/>
        </Card>
    );
};

export default MainChat;
