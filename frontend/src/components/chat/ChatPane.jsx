import React, { useEffect, useRef, useState } from "react";
import InputBox from "./chatPane/InputBox.jsx";

function ChatPane() {
    
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);


    return (
        <div className="chatPaneContainer">
            <div className="introTextContainer">
                <h3>Your personal healthcare chatbot</h3>
            </div>

            <div className="MessagesContainer">
                <div className="MessagesContainerScroll">
                    {messages}
                </div>
                <div id={"Messageanchor"} />
            </div>

            <InputBox setMessages={setMessages}/>
        </div>
    )
}

export default ChatPane;