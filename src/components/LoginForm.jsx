import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (username === 'qaifi' && password === 'qaifi') {
            localStorage.setItem('admin', username);
            login();
            alert('Login Successful');
            navigate('/orders');
        } else {
            alert('Please enter valid credentials');
            navigate('/login');
        }
    }


    return (
        <div id="loginform-wrapper">
            <form className="LoginPage" id="loginform" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input className="LoginPage_InputField" value={username} type="text" name="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                <input className="LoginPage_InputField" value={password} type="password" name="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                <input className="LoginPage_Button" type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginForm;
