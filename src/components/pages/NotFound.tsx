import { NavLink } from "react-router-dom";
import "components/styles/notfound.css";

export default function NotFound() {
    return (
        <div className="notfound-container">
            <h1 className="header-text">404</h1>
            <p className="description">Page not found</p>
            <NavLink to='/' exact={true} className="link">
                Back to homepage
            </NavLink>
        </div>
    )
};