import React from 'react'
import "../styles/components/HeaderStyles.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout_user as logout } from '../redux/UserAction';

const Header = () => {

    const dispatch = useDispatch();
    const currentUser = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/netbanking");
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        navigate("/");
    }

    return (
        <div className="header-container">
            <div className="title">
                <h3>
                    OUR BANK
                </h3>
            </div>
            <div className="more">
                <div className="slogan">
                    <p>Banking made easier and simpler</p>
                </div>
                <div className="button">
                    {currentUser == null ? <button onClick={() => handleLogin()}>Login</button> : <button onClick={ () => handleLogout()}>Logout</button>}
                </div>
            </div>
        </div>
    )
}

export default Header
