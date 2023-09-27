import { useEffect, useState } from 'react';
import './users.css';
import '../Orders/orders.css';
import { formatDate } from '../../utils';
import { useNavigate } from 'react-router-dom';

function Users({ isLoggedIn }) {

    const navigate = useNavigate();
    const user = localStorage.getItem('admin');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user])

    const handleReset = () => {
        setSearchText('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText.length < 2) {
            alert("Please enter at least 2 characters");
            fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users').then(res => res.json()).then(data => { setUsers(data); setSearchResults([]) });
            return;
        }
        fetch(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchText}`).then(res => res.json()).then(data => setSearchResults(data));
    }

    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users').then(res => res.json()).then(data => setUsers(data));
    }, []);

    if (!isLoggedIn) {
        return <></>
    }
    return (
        <div className="outer-wrapper">
            <h1 className="main-heading">Users</h1>
            <div>
                <form className="userlist-filter" id="search-form" onSubmit={handleSubmit}>
                    <input className="userlist-searchbox" value={searchText} onChange={e => setSearchText(e.target.value)} type="search" id="searchBox" placeholder="Search by Name" />
                    <input type="reset" className="userlist-reset-btn" value="Reset" id="resetBtn" onClick={() => handleReset()} />
                </form>
                <div style={{ width: "100%" }}>
                    <table className="order-table">
                        <tr>
                            <th>ID</th>
                            <th>User Avatar</th>
                            <th>Full Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Current Location</th>
                        </tr>
                        <tbody id="table-body">
                            {(!searchResults || searchResults.length === 0) && users && users.map((user, index) => {
                                const { currentCity, currentCountry, dob, fullName, gender, id, profilePic } = user;
                                return (
                                    <tr key={index}>
                                        <td className='secondary-text'>{id}</td>
                                        <td><img src={profilePic} alt={fullName} /></td>
                                        <td className='secondary-text'>{fullName}</td>
                                        <td>{formatDate(dob)}</td>
                                        <td className='secondary-text'>{gender}</td>
                                        <td className='secondary-text'>{`${currentCity}, ${currentCountry}`}</td>
                                    </tr>
                                )
                            })}
                            {searchResults && searchResults.length > 0 && (
                                searchResults.map((searchItem, index) => {
                                    const { currentCity, currentCountry, dob, fullName, gender, id, profilePic } = searchItem;
                                    return (
                                        <tr key={index}>
                                            <td className='secondary-text'>{id}</td>
                                            <td><img src={profilePic} alt={fullName} /></td>
                                            <td className='secondary-text'>{fullName}</td>
                                            <td>{formatDate(dob)}</td>
                                            <td className='secondary-text'>{gender}</td>
                                            <td className='secondary-text'>{`${currentCity}, ${currentCountry}`}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;
