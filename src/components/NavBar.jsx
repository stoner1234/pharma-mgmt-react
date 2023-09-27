import { NavLink } from "react-router-dom";

function NavBar({ isLoggedIn, logout, goToLogin }) {
    return (
        <div className="topbar">
            <div className="topbar-left-menu">
                <div className="topbar-logo">
                    <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo" />
                    <p className="topbar-text">Kafene</p>
                </div>
                <nav>
                    <NavLink className="topbar-menu-items" to="./orders">Orders</NavLink>
                    <NavLink className="topbar-menu-items" to="./products">Products</NavLink>
                    <NavLink className="topbar-menu-items" to="./users">Users</NavLink>
                </nav>
            </div>
            <NavLink className="topbar-menu-items" id="logout-button" to={!isLoggedIn && '/login'}>
                <p onClick={() => isLoggedIn ? logout() : goToLogin()}> {isLoggedIn ? 'Logout' : 'Login'} </p>
            </NavLink>
        </div >
    )
}

export default NavBar;
