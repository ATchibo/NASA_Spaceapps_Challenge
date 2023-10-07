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

    const [currentMessage, setCurrentMessage] = useState("");

    /**
     * Websocket Connection
     * */

    const [socket, setSocket] = useState<WebSocket>();
    const [receivedMsg, setReceivedMsg] = useState("");
    const [receivingMsg, setReceivingMsg] = useState(false);

    useEffect(() => {
        // connect to WebSocket server

        const socket = new WebSocket('ws://localhost:5000/echo');
        socket.addEventListener('message', ev => {
            if (ev.data === "$$$") {
                // end of message
                setReceivedMsg("");
                setReceivingMsg(false);
            } else {
                console.log(ev.data);
                setReceivedMsg(receivedMsg + ev.data);
            }
        });
        setSocket(socket);
    }, []);

    const sendMessage = (event: any) => {
        event.preventDefault();

        if (currentMessage.length === 0)
            return;

        if (socket)
            socket.send(currentMessage);
        setMessageQueue([...messageQueue, {sender: SENDER_TYPE_USER, content: currentMessage}, {sender: SENDER_TYPE_BOT, content: ""}]);
        setReceivingMsg(true);
        setCurrentMessage("");
    }

    useEffect(() => {
        if (receivedMsg.length > 0) {
            setMessageQueue([...messageQueue.slice(0, messageQueue.length-1), {sender: SENDER_TYPE_BOT, content: receivedMsg}]);
        }
    }, [receivedMsg]);

    /**
    * End Websocket Connection
    * */

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
            <MessageInputBox sendMessage={sendMessage} msg={currentMessage} setMsg={setCurrentMessage} canSend={receivingMsg}/>
        </Card>
    );
};

export default MainChat;
