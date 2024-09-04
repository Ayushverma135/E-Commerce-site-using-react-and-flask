import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const DeleteProduct = () => {
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    let location = useLocation();

    const deleteProduct = async (uid) => {
        try {
            const res = await fetch('/deleteProduct', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                }),
            });

            if (res.status === 201) {
                window.alert('Deleted successfully');
                navigate('/'); // Use navigate instead of history.push
            } else {
                window.alert('Something went wrong!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Optionally, you could call deleteProduct() here if you want to delete on component mount
        // deleteProduct(location.state.uid);
    }, [location.state.uid]);

    return (
        <div>
            <div className="col-md-6 offset-md-3 mt-2">
                <div className="input-group mb-3 mt-3">
                    <div className="input-group-prepend">
                        <h3 id="basic-addon1">Are you sure you want to delete your product?</h3>
                    </div>
                </div>

                <div style={{ flexDirection: 'row' }}>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => navigate('/')} // Use navigate instead of history.push
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{ marginLeft: '25px' }}
                        onClick={() => deleteProduct(location.state.uid)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
