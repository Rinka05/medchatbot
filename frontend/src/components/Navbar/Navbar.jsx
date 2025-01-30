import React, { useState } from "react";
import "./Navbar.css";
import { FiMenu } from "react-icons/fi";
import {Link} from 'react-scroll';


function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
        <a href="/" className="logoText"><span>c</span>a<span>r</span>e</a>
      <div className="desktopMenu">

        <Link activeClass='active' to='home' spy={true} smooth="true" offset={-100} duration={500} className="desktopMenuListItem">Home</Link>
        <Link activeClass='active'  className="desktopMenuListItem" to = "login"  spy={true} smooth="true" offset={-50} duration={500}>login</Link>
        <Link activeClass='active' to='uses' spy={true} smooth="true" offset={-50} duration={500} className="desktopMenuListItem">How to use</Link>
        <Link activeClass='active' to='about' spy={true} smooth="true" offset={-80} duration={500} className="desktopMenuListItem">About Us</Link>
      </div>
     
      <div className="mobMenu" onClick={()=>setShowMenu(!showMenu)}><FiMenu/></div>
      <div className="navMenu" style={{display: showMenu? 'flex': 'none'}}>
        <Link activeClass='active' to='home' spy={true} smooth="true" offset={-100} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>Home</Link>
        <Link activeClass='active' to='login' spy={true} smooth="true" offset={-50} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>link</Link>
        <Link activeClass='active' to='uses' spy={true} smooth="true" offset={-50} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>How to use</Link>
        <Link activeClass='active' to='about' spy={true} smooth="true" offset={-80} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>About Us</Link>
        <Link activeClass='active' to='contact' spy={true} smooth="true" offset={-50} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;

