import React, {useEffect, useState} from 'react';
import {Card} from "flowbite-react";
import TextArea from "./TextArea";
import MessageInputBox from "./MessageInputBox";
import {useIntl} from "react-intl";
import {linksDict} from "./Dictionary";

export type Message = {
    sender: string;
    content: string;
}

const MainChat = () => {

    const intl = useIntl();

    const SENDER_TYPE_BOT = intl.formatMessage({id: "sender_type_bot"})
    const SENDER_TYPE_USER = intl.formatMessage({id: "sender_type_user"})
    const INITIAL_BOT_MESSAGE = intl.formatMessage({id: "initial_msg_bot"})

    const temp = "<p>test <b>test bold</b> <i>test italic</i>" +
        "<ul><li>unu</li><li>doi</li><li><a href='www.google.com'>gugle</a></li></ul>"


    const [messageQueue, setMessageQueue] = useState<Message[]>([{
        sender: SENDER_TYPE_BOT,
        content: INITIAL_BOT_MESSAGE,
        // content: temp
    }]);

    const [currentMessage, setCurrentMessage] = useState("");
    const [msgToSend, setMsgToSend] = useState("");
    const [wsIndex, setWsIndex] = useState(-1);

    const sendMessage = (event: any) => {
        event.preventDefault();

        if (currentMessage.length === 0)
            return;

        setMessageQueue([...messageQueue, {sender: SENDER_TYPE_USER, content: currentMessage}, {sender: SENDER_TYPE_BOT, content: ""}]);
        setReceivingMsg(true);
        setMsgToSend(currentMessage);
        setCurrentMessage("");
        setReceivedMsg("");
        startSendingMessage();
    }

    /**
     * Websocket Connection
     * */

    const [fnIndex, setFnIndex] = useState(36);
    const [receivedMsg, setReceivedMsg] = useState("");
    const [receivingMsg, setReceivingMsg] = useState(false);

    const connectToWebsocket = () => {
        return new WebSocket('wss://e038-34-125-61-168.ngrok-free.app/queue/join');
    }

    const sessionHash = "lji2pmsp8uk";
    const closeEvent = "close";

    const step1 = () => {
        var currentFnIndex = fnIndex;
        // setFnIndex(currentFnIndex + 1);

        // step 1/7
        const socket = connectToWebsocket();

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString.includes("send_hash")) {
                console.log("send hash")

                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {

                console.log("send data")

                socket?.send(JSON.stringify({
                    data: [msgToSend],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            console.log("se inchide");
            // step2();
            setFnIndex(currentFnIndex + 1);
            setWsIndex(wsIndex + 1);
        })
    }

    const step2 = () => {
        var currentFnIndex = fnIndex;
        // setFnIndex(currentFnIndex + 1);

        // step 2/7
        const socket = connectToWebsocket();

        console.log("ma conectez la sock:", socket);

        socket.addEventListener("add", (ev) => {
            socket.send(JSON.stringify({
                fn_index: currentFnIndex,
                session_hash: sessionHash
            }));
        });

        console.log("socket after send:", socket);

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            console.log("avem date:", ev.data);

            if (dataString.includes("send_hash")) {
                console.log("send hash")

                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {
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
                        "UserData",
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
            // step3();
            setFnIndex(currentFnIndex + 1);
            setWsIndex(wsIndex + 1);
        })
    }

    const step3 = () => {
        var currentFnIndex = fnIndex;
        // setFnIndex(currentFnIndex + 1);

        // step 3/7
        const socket = connectToWebsocket();
        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString.includes("send_hash")) {
                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {
                socket?.send(JSON.stringify({
                    data: [],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            // step4();
            setFnIndex(currentFnIndex + 1);
            setWsIndex(wsIndex + 1);
        })
    }

    const step4 = () => {
        var currentFnIndex = fnIndex;
        // setFnIndex(currentFnIndex + 1);

        // step 4/7
        const socket = connectToWebsocket();
        socket.addEventListener("add", (ev) => {
            socket.send(JSON.stringify({
                fn_index: currentFnIndex,
                session_hash: sessionHash
            }));
        });

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString.includes("send_hash")) {
                console.log("send hash")

                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {
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
                        "UserData",
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
            // step5();
            setFnIndex(currentFnIndex + 1);
            setWsIndex(wsIndex + 1);
        })
    }

    const step5 = () => {
        var currentFnIndex = fnIndex;
        // setFnIndex(currentFnIndex + 1);

        // step 5/7
        const socket = connectToWebsocket();
        socket.addEventListener("add", (ev) => {
            socket.send(JSON.stringify({
                fn_index: currentFnIndex,
                session_hash: sessionHash
            }));
        });

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString.includes("send_hash")) {
                console.log("send hash")

                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {
                socket?.send(JSON.stringify({
                    data: [],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            // step6();
            setFnIndex(currentFnIndex + 1);
            setWsIndex(wsIndex + 1);
        })
    }

    const step6 = () => {
        var currentFnIndex = fnIndex;
        // setFnIndex(currentFnIndex + 1);

        // step 6/7
        const socket = connectToWebsocket();
        socket.addEventListener("add", (ev) => {
            socket.send(JSON.stringify({
                fn_index: currentFnIndex,
                session_hash: sessionHash
            }));
        });

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString.includes("send_hash")) {
                console.log("send hash")

                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {
                socket?.send(JSON.stringify({
                    data: [],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            // step7();
            setFnIndex(currentFnIndex + 1);
            setWsIndex(wsIndex + 1);
        })
    }

    const step7 = () => {
        var currentFnIndex = fnIndex;
        setFnIndex(currentFnIndex + 1);

        let allMessages: any[] = [];

        for (let i = 2; i < messageQueue.length; i += 2) {
            if (messageQueue[i].content.length > 0)
                allMessages.push([messageQueue[i-1].content, messageQueue[i].content]);
            else allMessages.push([messageQueue[i-1].content, null]);
        }
        // allMessages.push([msgToSend, null]);

        console.log(messageQueue);
        console.log(allMessages);

        // step 7/7
        const socket = connectToWebsocket();
        socket.addEventListener("add", (ev) => {
            socket.send(JSON.stringify({
                fn_index: currentFnIndex,
                session_hash: sessionHash
            }));
        });

        socket?.addEventListener('message', ev => {
            const dataString = JSON.stringify(ev.data);

            if (dataString.includes("send_hash")) {
                console.log("send hash")

                socket?.send(JSON.stringify({
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("send_data")) {
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
                        "UserData",
                        "Query",
                        3,
                        true,
                        512,
                        [
                            "All_Relevant"
                        ],
                        null,
                        null,
                        allMessages
                    ],
                    event_data: null,
                    fn_index: currentFnIndex,
                    session_hash: sessionHash
                }));
            } else if (dataString.includes("process_starts")) {
                setReceivedMsg("");
            } else if (dataString.includes("process_generating")) {
                let response = (ev.data as string).split(msgToSend + "\",\"")[1].split("\"]")[0];
                // console.log(response);
                response = receivedMsg + response;

                for (let [key, value] of Object.entries(linksDict)) {

                    console.log("cheie:", key);
                    if (response.includes(key)) {
                        console.log("include", key);
                        console.log("replace with:", value);
                        response = response.replaceAll(key, value);
                        console.log("response after", response);
                    }
                }

                setReceivedMsg(response);
            }
        });
        socket?.addEventListener(closeEvent, ev => {
            console.log("gata bos")
            setFnIndex(36);
            setWsIndex(-1);
        })
    }

    const startSendingMessage = () => {
        setWsIndex(1);
    }

    useEffect(() => {
        switch (wsIndex) {
            case 1:
                step1();
                break;
            case 2:
                step2();
                break;
            case 3:
                step3();
                break;
            case 4:
                step4();
                break;
            case 5:
                step5();
                break;
            case 6:
                step6();
                break;
            case 7:
                step7();
                break;
        }
    }, [wsIndex]);

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
                bg-gray-100
            "
        >
            <TextArea messageQueue={messageQueue}/>
            <MessageInputBox sendMessage={sendMessage} msg={currentMessage} setMsg={setCurrentMessage} canSend={receivingMsg}/>
        </Card>
    );
};

export default MainChat;
