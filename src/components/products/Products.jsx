import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import '../../index.css';
import '../Orders/orders.css';

function Products({ isLoggedIn }) {
    const navigate = useNavigate();
    const user = localStorage.getItem('admin');

    const yearMap = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };

    const generateDate = (dateString = "") => {
        return dateString.split('-').reverse().reduce((str, char) => {
            if (yearMap[char]) {
                str += yearMap[char] + "-";
            } else {
                str += char + "-"
            }
            return str.substring(0, 10)
        }, "");
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user])

    const [products, setProducts] = useState([]);
    const [response, setResponse] = useState([]);
    const [filters, setFilters] = useState({});
    useEffect(() => {
        fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products').then(res => res.json()).then(data => {
            const lowStockItems = data && data.filter(item => item.stock <= 100);
            let expiredItems = data && data.filter(item => {
                const currentDate = new Date();
                const productExpDate = new Date(generateDate(item.expiryDate));
                return productExpDate < currentDate
            });
            expiredItems = expiredItems.filter((i) => !lowStockItems.includes(i));
            const itemsWithHighStock = data.filter(i => !lowStockItems.includes(i));
            console.log("itemsWithHighStock", itemsWithHighStock);
            const itemsWithoutExpiry = itemsWithHighStock.filter(i => !expiredItems.includes(i));
            console.log("itemsWithoutExpiry", itemsWithoutExpiry);
            console.log("low", lowStockItems);
            console.log("exp", expiredItems);
            setProducts(itemsWithoutExpiry);
            setResponse(data);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const lowStockItems = response && response.filter(item => item.stock < 100);
        const expiredItems = response && response.filter(item => {
            const currentDate = new Date();
            const productExpDate = new Date(generateDate(item.expiryDate));
            return productExpDate < currentDate
        });
        const itemsWithHighStock = response.filter(i => !lowStockItems.includes(i));
        const itemsWithoutExpiry = itemsWithHighStock.filter(i => !expiredItems.includes(i));
        let newItems = [];
        if (filters['expiredCheckBox'] && filters["lowStockCheckBox"]) {
            newItems = [...response];
        } else if (filters['expiredCheckBox'] && !filters['lowStockCheckBox']) {
            newItems = response.filter(i => !lowStockItems.includes(i));
        } else if (filters['lowStockCheckBox'] && !filters['expiredCheckBox']) {
            newItems = response.filter(i => !expiredItems.includes(i));
        } else {
            newItems = itemsWithoutExpiry;
        }
        setProducts([...newItems]);
        // eslint-disable-next-line
    }, [filters]);

    if (!isLoggedIn) {
        return <></>
    }
    console.log("prod", products, filters);
    return (
        <div className="outer-wrapper">
            <h1 className="main-heading">Products</h1>
            <div className="inner-wrapper">
                <div className="filter-wrapper">
                    <h3>Filters</h3>
                    <div className="filter-option">
                        <p>Count: <span id="1">{products && products.length}</span></p>
                        <label className="filter-checkbox"><input type="checkbox" name="orders-new" id="expiredCheckBox"
                            onChange={e => setFilters({ ...filters, [e.target.id]: e.target.checked })} checked={filters["expiredCheckBox"]} />Expired</label>
                        <label className="filter-checkbox"><input type="checkbox" name="orders-packed" id="lowStockCheckBox"
                            onChange={e => setFilters({ ...filters, [e.target.id]: e.target.checked })} checked={filters["lowStockCheckBox"]} />Low Stock</label>

                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <table className="order-table">
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th>Expiry Date</th>
                            <th>Unit Price</th>
                            <th>Stock</th>
                        </tr>
                        <tbody id="table-body">
                            {products && products.map(product => {
                                const { expiryDate, id, medicineBrand, medicineName, stock, unitPrice } = product;
                                return (
                                    <tr>
                                        <td className='secondary-text'>{id}</td>
                                        <td>{medicineName}</td>
                                        <td className='secondary-text'>{medicineBrand}</td>
                                        <td>{formatDate(expiryDate)}</td>
                                        <td className='secondary-text'>${unitPrice}</td>
                                        <td className='secondary-text'>{stock}</td>
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

export default Products;
