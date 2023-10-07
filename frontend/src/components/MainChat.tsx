import React, {useEffect, useState} from 'react';
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

    const SENDER_TYPE_BOT = intl.formatMessage({id: "sender_type_bot"})
    const SENDER_TYPE_USER = intl.formatMessage({id: "sender_type_user"})
    const INITIAL_BOT_MESSAGE = intl.formatMessage({id: "initial_msg_bot"})

    const [messageQueue, setMessageQueue] = useState<Message[]>([{
        sender: SENDER_TYPE_BOT,
        content: INITIAL_BOT_MESSAGE
    }]);

    const [msgToSend, setMsgToSend] = useState("");

    // const {
    //     data: sendMessageData,
    //     isFetching: isSendMessageFetching,
    //     isSuccess: isSendMessageSuccess,
    //     refetch: refetchSendMessage
    // } = useQuery(
    //     ["sendMessage", msgToSend],
    //     () => sendMessageApi(msgToSend),
    //     {
    //         enabled: false
    //     }
    // )

    const [currentMessage, setCurrentMessage] = useState("");
    const sendMessage = (event: any) => {
        event.preventDefault();

        if (currentMessage.length === 0)
            return;

        setMsgToSend(currentMessage);
        setCurrentMessage("");
    }

    useEffect(() => {
        if (msgToSend.length > 0) {
            setMessageQueue([...messageQueue, {sender: SENDER_TYPE_USER, content: msgToSend}]);
            setMsgToSend("");
        }
    }, [msgToSend]);

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
