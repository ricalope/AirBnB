import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';
import { Modal } from '../../context/Modal';
import { searchSpotsThunk } from '../../store/search';
import logo from '../../assets/android-chrome-512x512.png';
import './Navigation.css';

function Navigation({ isLoaded }) {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const spotsObj = useSelector(state => state.search.searchResults);
    const spots = Object.values(spotsObj);

    const [ showModal, setShowModal ] = useState(false);
    const [ login, setLogin ] = useState(true);
    const [ search, setSearch ] = useState('');
    const [ filter, setFilter ] = useState('city');
    const [ result, setResult ] = useState(false);

    useEffect(() => {
        if (!result) return;
        const closeMenu = () => {
            setResult(false)
            setSearch('')
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [ result ])

    const submitSearch = async e => {
        e.preventDefault();
        setResult(true)

        const formData = {
            search,
            filter
        }

        await dispatch(searchSpotsThunk(formData))
        setSearch('');
        return
    }

    const onError = e => {
        e.target.src = logo
    }

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <div className="nav-img-logo">
                    <img
                        className="logo"
                        src={logo}
                        alt="tiny-hub-logo"
                        style={{ width: 40, height: 40 }} />
                </div>
                <div className="nav-th-logo">
                    <h1>tiny hub</h1>
                </div>
            </div>
            <div className="nav-center">
                <form onSubmit={submitSearch} id="form-search">
                    <div className="search-bar-container">
                        <div className="div-input">
                            <input
                                type="text"
                                className="search-input"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="div-dd">
                            <select
                                className="search-dd"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="city">City</option>
                                <option value="state">State</option>
                                <option value="address">Address</option>
                            </select>
                        </div>
                        <div className="div-submit">
                            <button type="submit" id="sub-btn">
                                <i className="fa-solid fa-magnifying-glass" />
                            </button>
                        </div>
                    </div>
                </form>
                {result && spots?.length > 0 && (
                    <div className="search-result">
                        {spots.map(spot => (
                            <Link
                                key={spot.id}
                                exact="true" to={`/spots/${spot.id}`}
                                className="link-card"
                                onClick={() => setResult(false)}>
                                <div className="search-card">
                                    <div className="search-image">
                                        <img onError={onError} src={spot.imageUrl} alt="tiny house" id="img-icon" />
                                    </div>
                                    <div className="city-state-wrapper">
                                        <div className="search-city">
                                            {spot.city},
                                        </div>
                                        &nbsp;
                                        <div className="search-state">
                                            {spot.state}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {result && spots?.length === 0 && (
                    <div className="search-result">
                        no results found. <br />
                        please try again.
                    </div>
                )}
            </div>
            <div className="nav-right">
                <ul>
                    <li id="home-button">
                        <NavLink exact to="/">
                            <div className="home-button">
                                <i className="fa-sharp fa-solid fa-house"></i>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <div className="prof-btn">
                            {isLoaded && (
                                <ProfileButton
                                    user={sessionUser}
                                    setLogin={setLogin}
                                    setShowModal={setShowModal}
                                />
                            )}
                        </div>
                    </li>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            {login ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal} />}
                        </Modal>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
