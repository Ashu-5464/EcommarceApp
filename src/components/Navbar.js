import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import Register from './Register';

const Navbar = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [cartProductListByCustomer, setCartProductListByCustomer] = useState([]);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const navigate = useNavigate();

    const getCategoryList = async () => {
        try {
            const result = await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllCategory");
            if (result.data.data !== undefined) {
                setCategoryList(result.data.data);
            }
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    }

    const handleLogout = () => {
        // Your logout logic here
        setIsLoggedIn(false);
    };

    const naviagteToCheckOut=()=>{
        navigate("/checkOut");
        setNavbarVisible(false);
      }
    useEffect(() => {
        getCategoryList();
    }, []);

    const showLoginModalHandler = () => {
        setShowLoginModal(true);
    }

    const closeLoginModalHandler = () => {
        setShowLoginModal(false);
    }

    const showRegisterModalHandler = () => {
        setShowRegisterModal(true);
    }

    const closeRegisterModalHandler = () => {
        setShowRegisterModal(false);
    }

    const toggleCartDropdown = () => {
        setShowCartDropdown(!showCartDropdown);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top mynav pb-2 pt-2 mb-10">
                <div className="container">
                    <div className="navbar-brand align-self-baseline">
                        <FontAwesomeIcon icon={faCartShopping} className="me-2" /> Big Basket
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <div className="navbar-nav ms-auto mb-2 mb-lg-0 text-dark">
                            <Link className="nav-link" to="/">Home</Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    {categoryList.map(category => (
                                        <li key={category.id}>
                                            <Link className="dropdown-item" to={`/category/${category.categoryId}`}>{category.categoryName}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="nav-item dropdown">
                                <a className="nav-link" href="#" onClick={toggleCartDropdown}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'black' }} />
                                    <i className="fa fa-cart-shopping fs-5 me-1" style={{ color: '#202122' }}></i>
                                </a>
                                <ul className={`dropdown-menu menuOnLeft rounded-0 mt-2 ${showCartDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                    {cartProductListByCustomer.map((cartItem, index) => (
                                        <li key={index} className="p-2">
                                            <div className="d-flex border-bottom justify-content-between align-items-center">
                                                <img className="image-fluid" src={cartItem.productImageUrl} alt="" />
                                                <div>
                                                    <a href="#" className="text-decoration-none text-black fw-semibold">
                                                        <p className="m-0 p-0">{cartItem.productShortName}</p>
                                                    </a>
                                                    <p>{cartItem.quantity} * <i className="fa-solid fa-xmark" style={{ color: '#0d0d0d' }} ></i> ${cartItem.productPrice}</p>
                                                </div>
                                                <button type="button" className="btn fs-5 closeBtn">
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                    <li className="p-2">
                                        <div className="d-flex justify-content-between">
                                            <h6>SubTotal :</h6>
                                            <h6>${cartProductListByCustomer.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2)}</h6>
                                        </div>
                                        <div className="d-flex justify-content-evenly mt-2">
                                            <button className="btn btn-dark rounded-0 px-3">View Cart</button>
                                            <button className="btn btn-danger rounded-0 px-3" ><a className="text-decoration-none text-black" href="#" onClick={naviagteToCheckOut}>Checkout</a></button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faUser} /></Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" onClick={showLoginModalHandler}>Login</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={showRegisterModalHandler}>Register</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Login showLoginModal={showLoginModal} closeModalLogin={closeLoginModalHandler} />
            {showRegisterModal && <Register closeModalRegister={closeRegisterModalHandler} />}
        </>
    );
};

export default Navbar;
