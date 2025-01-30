import React, { useState } from "react";
import axios from 'axios';
import MessageBox from "./MessageBox.jsx";
    function InputBox({ setMessages }) {
        const [query, setQuery] = useState("");
    
        async function onSubmit(e) {
            e.preventDefault();
            if (query.trim() === "") return;
    
            // Add user's message to the chat
            setMessages((prev) => [
                ...prev,
                <MessageBox content={query} bot={false} key={Math.random()} />,
            ]);
    
            try {
                const response = await axios.post("http://localhost:5000/chat", { query });
                if (response.data) {
                    setMessages((prev) => [
                        ...prev,
                        <MessageBox content={response.data.output} bot={true} key={Math.random()} />,
                    ]);
                }
            } catch (error) {
                console.error("Error communicating with chatbot:", error);
                setMessages((prev) => [
                    ...prev,
                    <MessageBox content="Error: Unable to get response" bot={true} key={Math.random()} />,
                ]);
            }
    
            setQuery("");
        }
    return (
        <div className="InputBoxContainer">
                <form className="InputForm" onSubmit={onSubmit}>
                    <input
                        style={{color: "black"}}
                        type="text"
                        placeholder="Ask your query..."
                        className="InputBox"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    ></input>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            border: "none",
                            height: "26px",
                            marginRight: "5px"}}
                    ><img src="/send.png" height={26} /></button>
                </form>
        </div>
    )
}

export default InputBox;
