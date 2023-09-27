import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Orders from './components/Orders/Orders';
import Users from './components/users/Users';
import Products from './components/products/Products';
import LoginForm from './components/LoginForm';
import { useState } from 'react';

function App() {
  const initialState = {
    isLoggedIn: false,
    users: [],
    products: [],
    orders: []
  };
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }

  const loginUser = () => {
    setState({
      ...state, isLoggedIn: true
    });
  }

  const logoutUser = () => {
    console.log("logout")
    localStorage.removeItem('admin');
    setState({ ...state, isLoggedIn: false });
  }

  return (
    <div>
      <NavBar isLoggedIn={state.isLoggedIn} goToLogin={goToLogin} logout={logoutUser} />
      <Routes>
        <Route path='/orders' element={<Orders isLoggedIn={state.isLoggedIn} />} />
        <Route path='products' element={<Products isLoggedIn={state.isLoggedIn} />} />
        <Route path='/users' element={<Users isLoggedIn={state.isLoggedIn} />} />
        <Route path='/login' element={<LoginForm login={loginUser} />} />
      </Routes>
    </div>
  );
}

export default App;