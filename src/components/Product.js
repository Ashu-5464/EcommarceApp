import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState, } from 'react';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login } from '../store/slice/UserSclice.js';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            toast.success('Item added to cart!', { position: 'top-right' });
        } else {
            toast.error('Please log in to add items to the cart.', { position: 'top-right' });
        }
    };

    const [productlist, setProductList] = useState([]);

    const getProductList = async () => {
        const result = await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllProducts");
        setProductList(result.data.data);
    }

    const [cartItemsobj, setcartItemsobj] = useState({
        "cartId": 0,
        "custId": '',
        "productId": 0,
        "quantity": 0,
        "addedDate": ""
    });

    const [loading, setLoading] = useState(false); // Moved useState here

    const addToCart = (productId, custId) => {
        const updatedCartItemsobj = {
            CartId: 0,
            CustId: custId,
            ProductId: productId,
            Quantity: 1,
            AddedDate: new Date().toISOString()
        };

        setLoading(true);

        axios.post('https://freeapi.miniprojectideas.com/api/BigBasket/AddToCart', updatedCartItemsobj)
            .then(response => {
                setLoading(false);
                if (response.data.data) {
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                setLoading(false);
                alert('Error adding item to cart: ' + error.message);
            });
    };

    useEffect(() => {
        getProductList();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='mt-5'></div>
            <div className="container mt-5">
                <div className='row mt-5'>
                    <h1 className='text-primary text-center'>Bestseller Products</h1>
                    {/* <p className='text-center'>Discover our handpicked selection of top-rated products. From must-have essentials to trendy favorites, find what you need to elevate your lifestyle.</p> */}
                </div>
                <div className="row mt-5">
                    {productlist.map(product => (
                        <div key={product.productSku} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card" style={{ height: '100%' }}>
                                <img src={product.productImageUrl} className="card-img-top" alt={product.productName} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body" style={{ height: '150px' }}>
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">Price: {product.productPrice}</p>
                                    <button className='bg-success form-control text-white' onClick={() => addToCart(product.productId, 1)}><FontAwesomeIcon icon={faBagShopping} /> Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Product;
