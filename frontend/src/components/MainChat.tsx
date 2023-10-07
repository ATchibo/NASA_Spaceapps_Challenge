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
    const [msgToSend, setMsgToSend] = useState("");

    const sendMessage = (event: any) => {
        event.preventDefault();

        if (currentMessage.length === 0)
            return;

        setMessageQueue([...messageQueue, {sender: SENDER_TYPE_USER, content: currentMessage}, {sender: SENDER_TYPE_BOT, content: ""}]);
        setReceivingMsg(true);
        setMsgToSend(currentMessage);
        setCurrentMessage("");

        startSendingMessage();
    }

    /**
     * Websocket Connection
     * */

    const [socket, setSocket] = useState<WebSocket>();
    const [fnIndex, setFnIndex] = useState(36);
    const [receivedMsg, setReceivedMsg] = useState("");
    const [receivingMsg, setReceivingMsg] = useState(false);

    const connectToWebsocket = () => {
        const socket = new WebSocket('wss://316c-35-203-157-221.ngrok-free.app/queue/join');
        console.log("socket:", socket);
        setSocket(socket);
    }

    const sessionHash = "ifonas1sp2";
    const closeEvent = "close";

    const step1 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 1/7
        connectToWebsocket();
        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_hash\"}\n") {
                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [msgToSend],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            step2();
        })
    }

    const step2 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 2/7
        connectToWebsocket();
        socket?.send(JSON.stringify({
            fn_index: currentFnIndex,
            session_hash: sessionHash
        }));

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [
                        msgToSend,
                        "",
                        "",
                        true,
                        "human_bot",
                        "{   'PreInput': None,\n    'PreInstruct': '<human>: ',\n    'PreResponse': '<bot>:',\n    'botstr': '<bot>:',\n    'chat_sep': '\\n',\n    'chat_turn_sep': '\\n',\n    'generates_leading_space': True,\n    'humanstr': '<human>:',\n    'promptA': '',\n    'promptB': '',\n    'terminate_response': [   '\\n<human>:',\n                              '\\n<bot>:',\n                              '<human>:',\n                              '<bot>:',\n                              '<bot>:']}",
                        0.1,
                        0.75,
                        40,
                        1,
                        256,
                        0,
                        false,
                        180,
                        1.07,
                        1,
                        false,
                        true,
                        "",
                        "",
                        "ChatLLM",
                        "Query",
                        3,
                        true,
                        512,
                        [
                            "All_Relevant"
                        ],
                        []
                    ],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            step3();
        })
    }

    const step3 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 3/7
        connectToWebsocket();
        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_hash\"}\n") {
                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            step4();
        })
    }

    const step4 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 3/7
        connectToWebsocket();
        socket?.send(JSON.stringify({
            fn_index: currentFnIndex,
            session_hash: sessionHash
        }));

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [
                        msgToSend,
                        "",
                        "",
                        true,
                        "human_bot",
                        "{   'PreInput': None,\n    'PreInstruct': '<human>: ',\n    'PreResponse': '<bot>:',\n    'botstr': '<bot>:',\n    'chat_sep': '\\n',\n    'chat_turn_sep': '\\n',\n    'generates_leading_space': True,\n    'humanstr': '<human>:',\n    'promptA': '',\n    'promptB': '',\n    'terminate_response': [   '\\n<human>:',\n                              '\\n<bot>:',\n                              '<human>:',\n                              '<bot>:',\n                              '<bot>:']}",
                        0.1,
                        0.75,
                        40,
                        1,
                        256,
                        0,
                        false,
                        180,
                        1.07,
                        1,
                        false,
                        true,
                        "",
                        "",
                        "ChatLLM",
                        "Query",
                        3,
                        true,
                        512,
                        [
                            "All_Relevant"
                        ],
                        []
                    ],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            step5();
        })
    }

    const step5 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 3/7
        connectToWebsocket();
        socket?.send(JSON.stringify({
            fn_index: currentFnIndex,
            session_hash: sessionHash
        }));

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            step6();
        })
    }

    const step6 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 3/7
        connectToWebsocket();
        socket?.send(JSON.stringify({
            fn_index: currentFnIndex,
            session_hash: sessionHash
        }));

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            step7();
        })
    }

    const step7 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        // step 3/7
        connectToWebsocket();
        socket?.send(JSON.stringify({
            fn_index: currentFnIndex,
            session_hash: sessionHash
        }));

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString === "{\"msg\":\"send_data\"}\n") {
                socket?.send(JSON.stringify({
                    data: [
                        msgToSend,
                        "",
                        "",
                        true,
                        "human_bot",
                        "{   'PreInput': None,\n    'PreInstruct': '<human>: ',\n    'PreResponse': '<bot>:',\n    'botstr': '<bot>:',\n    'chat_sep': '\\n',\n    'chat_turn_sep': '\\n',\n    'generates_leading_space': True,\n    'humanstr': '<human>:',\n    'promptA': '',\n    'promptB': '',\n    'terminate_response': [   '\\n<human>:',\n                              '\\n<bot>:',\n                              '<human>:',\n                              '<bot>:',\n                              '<bot>:']}",
                        0.1,
                        0.75,
                        40,
                        1,
                        256,
                        0,
                        false,
                        180,
                        1.07,
                        1,
                        false,
                        true,
                        "",
                        "",
                        "ChatLLM",
                        "Query",
                        3,
                        true,
                        512,
                        [
                            "All_Relevant"
                        ],
                        []
                    ],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString === "{\"msg\":\"process_starts\"}") {
                setReceivedMsg("");
                setReceivingMsg(false);
            } else if (dataString.includes("{\"msg\":\"process_generating\"")) {
                setReceivedMsg(receivedMsg + ev.data.output.data[0][0][1]);
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            console.log("gata bos")
        })
    }

    const startSendingMessage = () => {
        step1();
    }

    // useEffect(() => {
    //     // connect to WebSocket server
    //
    //     // const socket = new WebSocket('ws://localhost:5000/echo');
    //     const socket = new WebSocket('wss://316c-35-203-157-221.ngrok-free.app/queue/join');
    //     socket.addEventListener('message', ev => {
    //         if (ev.data === "$$$") {
    //             // end of message
    //             setReceivedMsg("");
    //             setReceivingMsg(false);
    //         } else {
    //             console.log(ev.data);
    //             setReceivedMsg(receivedMsg + ev.data);
    //         }
    //     });
    //     setSocket(socket);
    // }, []);

    useEffect(() => {

        console.log("Received msg: ", receivedMsg);

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
