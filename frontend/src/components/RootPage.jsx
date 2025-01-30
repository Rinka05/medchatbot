import React from "react";
import Navbar from "./Navbar/Navbar.jsx";

export default function RootPage(props) {

    return (
        <>
            <Navbar/>
            {props.children}
        </>

    );
}