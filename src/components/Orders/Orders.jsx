import './orders.css';
import '../../index.css';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils';
import { useNavigate } from 'react-router-dom';

function Orders({ isLoggedIn }) {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});

    const navigate = useNavigate();
    const user = localStorage.getItem('admin');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user])

    useEffect(() => {
        const checkBoxIds = ['DeliveredCheckBox', 'IntransitCheckBox', 'PackedCheckBox', 'NewCheckBox'];
        fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders').then(res => res.json()).then(data => { setOrders(data); setFilteredOrders(data) });
        const checkedItemsMap = checkBoxIds.reduce((map, checkbox) => {
            map[checkbox] = true;
            return map;
        }, {});
        setCheckedItems(checkedItemsMap);
    }, []);

    useEffect(() => {
        const checkBoxNamesMap = {
            New: 'NewCheckBox',
            Packed: 'PackedCheckBox',
            InTransit: 'IntransitCheckBox',
            Delivered: 'DeliveredCheckBox'
        };
        const filteredItems = orders.filter(order => {
            const status = order.orderStatus;
            const checkBox = checkBoxNamesMap[status];
            return checkedItems[checkBox] === true;
        });
        setFilteredOrders(filteredItems);
    }, [checkedItems, orders]);

    const handleChange = e => {
        setCheckedItems({
            ...checkedItems, [e.target.id]: e.target.checked
        });
    }

    if (!isLoggedIn) {
        return <></>
    }

    return (
        <div className="outer-wrapper">
            <h1 className="main-heading">Orders</h1>
            <div className="inner-wrapper">
                <div className="filter-wrapper">
                    <h3>Filters</h3>
                    <div className="filter-option">
                        <p>Count: <span id="count">{filteredOrders && filteredOrders.length}</span></p>
                        <label className="filter-checkbox"><input type="checkbox" id="NewCheckBox" name="orders-new" onChange={(e) => handleChange(e)} checked={checkedItems["NewCheckBox"]} />New</label>
                        <label className="filter-checkbox"><input type="checkbox" id="PackedCheckBox" name="orders-packed" onChange={(e) => handleChange(e)} checked={checkedItems["PackedCheckBox"]} />Packed</label>
                        <label className="filter-checkbox"><input type="checkbox" id="IntransitCheckBox" name="orders-transit" onChange={(e) => handleChange(e)} checked={checkedItems["IntransitCheckBox"]} />InTransit</label>
                        <label className="filter-checkbox"><input type="checkbox" id="DeliveredCheckBox" name="orders-delivered" onChange={(e) => handleChange(e)} checked={checkedItems["DeliveredCheckBox"]} />Delivered</label>
                    </div>
                </div>
                <div style={{ "width": "100%" }} id='table'>
                    <table className="order-table">
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                        <tbody id="table-body">

                            {filteredOrders.map((order, index) => {
                                const { amount, customerName, id, orderDate, orderStatus, orderTime } = order;
                                return (
                                    <tr key={index}>
                                        <td className='secondary-text'>{id}</td>
                                        <td>{customerName}</td>
                                        <td>
                                            <div>{formatDate(orderDate)}</div>
                                            <div className='secondary-text'>{orderTime}</div>
                                        </td>
                                        <td className='secondary-text'>${amount}</td>
                                        <td>{orderStatus}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders;
