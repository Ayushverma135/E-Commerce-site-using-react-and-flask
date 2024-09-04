import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import toast, { Toaster } from 'react-hot-toast';

const AllOrders = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const [dataa, setData] = useState('');
    const [orders, setOrders] = useState([]);

    const getAdminData = async () => {
        const token = await localStorage.getItem('token');
        try {
            const res = await fetch('/getAdminData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auth: token,
                }),
            });

            const data = await res.json();
            if (res.status === 201) {
                setData(data[0]);
                setOrders(data[0].orders);
            } else {
                window.alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const notifyDelete = () =>
        toast('Order Deleted!', {
            icon: '😔',
        });

    function googleTranslateElementInit() {
        const google = window.google;
        new google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
        );
    }

    const deleteOrder = async (oid, pid, qty) => {
    //     const confirmBox = window.confirm(
    //         'Do you really want to cancel the Order?'
    //     );
    //     if (confirmBox === true) {
    //         try {
    //             const res = await fetch('/deleteOrder', {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     uid: dataa._id['$oid'],
    //                     oid: oid,
    //                     pid: pid,
    //                     qty: qty,
    //                 }),
    //             });

    //             const data = await res.json();
    //             if (res.status === 201) {
    //                 notifyDelete();
    //                 setTimeout(() => {}, 2000);
    //                 navigate('/allOrders'); // Use navigate instead of history.push
    //                 window.location.reload();
    //             } else {
    //                 window.alert(data.message);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         navigate('/allOrders'); // Use navigate instead of history.push
    //     }
    };

    useEffect(() => {
        getAdminData();
    }, []);

    return (
        <div>
            <Toaster />
            <div className="container py-3">
                {/* <div className="row text-center mb-5 ">
                    <div className="col-lg-7 mx-auto">
                        <h1 className="display-4">Your Orders</h1>
                        <p className="lead mb-0">...</p>
                    </div>
                </div> */}
                {orders.length === 0 ? (
                    <div className="row text-center align-self-center" style={{ marginTop: '20%' }}>
                        <div className="col-lg-7 mx-auto">
                            <h1 className="display-4">No Orders to Display</h1>
                            <p className="lead mb-0" onClick={() => navigate('/')}>
                                Go Back to Home
                            </p>
                            <NavLink to="/" className="lead mb-0" style={{ color: '#0066ff' }}>
                                Go Back to Home
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <div className="row text-center mb-5 ">
                        <div className="col-lg-7 mx-auto">
                            <h1 className="display-4">My Orders</h1>
                            <p className="lead mb-0">...</p>
                        </div>
                    </div>
                )}

                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <ul className="list-group shadow">
                            {orders &&
                                orders.slice(0).reverse().map((p) => {
                                    return (
                                        <NavLink
                                            to={{
                                                pathname: '/allOrders',
                                                state: {
                                                    pid: p.pid,
                                                    uid: dataa._id['$oid'],
                                                    productUrl: p.productUrl,
                                                    productName: p.productName,
                                                    productType: p.productType,
                                                    productPrice: p.productPrice,
                                                },
                                            }}
                                            style={{ color: 'black' }}
                                        >
                                            <li className="list-group-item" key={p._id}>
                                                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                                                    <div className="media-body order-2 order-lg-1">
                                                        <h6 className="mt-0 font-weight-bold mb-2">{p.productName}</h6>
                                                        <p className="font-italic text-muted mb-0 small">
                                                            ₹ {p.productPrice} for {p.productType}
                                                        </p>
                                                        <p className="font-italic text-muted mb-0 small">
                                                            Quantity: {p.Quantity}
                                                        </p>
                                                        <p className="font-italic text-muted mb-0 small">
                                                            Total Price: {p.Quantity * p.productPrice}
                                                        </p>

                                                        <div style={{ flexDirection: 'row' }}>
                                                            {/* <NavLink
                                                                to="/allOrders"
                                                                style={{ color: 'red' }}
                                                                onClick={() => {
                                                                    deleteOrder(p._id['$oid'], p.pid, p.Quantity);
                                                                }}
                                                            >
                                                                CANCEL ORDER
                                                            </NavLink> */}
                                                        </div>
                                                    </div>
                                                    <img
                                                        src={p.productUrl}
                                                        alt="Product image"
                                                        width="200"
                                                        className="ml-lg-5 order-1 order-lg-2"
                                                    />

                                                    {/* <p className="font-italic text-muted mb-0 small order-1">
                                                        {' '}
                                                        <span style={{ color: 'green' }}>Delivered</span>
                                                    </p> */}
                                                </div>
                                            </li>
                                        </NavLink>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
                {googleTranslateElementInit}
            </div>
        </div>
    );
};

export default AllOrders;
