import { NavLink } from "react-router-dom";
import logo from "../assets/aircall-logo-text.png";
import "./header.css";

export default function Header() {
    return (
        <div className="header-container">
            <NavLink to='/' exact={true}>
                <img src={logo} className="header-logo" alt="aircall logo" />
            </NavLink>
        </div>
    )
};