import React, { useState } from 'react';
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

    const submitSearch = async e => {
        e.preventDefault();
        setResult(true);

        console.log('search <<', search, '>> filter <<', filter, '>> in submit function')

        const formData = {
            search,
            filter
        }
        await dispatch(searchSpotsThunk(formData))
    }

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <img
                    className="logo"
                    src={logo}
                    alt="tiny-hub-logo"
                    style={{ width: 40, height: 40 }} />
                <h1>tiny hub</h1>
            </div>
            <div className="nav-center">
                <form onSubmit={submitSearch}>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            className="search-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            className="search-dd"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="city">By City</option>
                            <option value="state">By State</option>
                            <option value="address">By Address</option>
                        </select>
                        <button type="submit">
                            search
                        </button>
                    </div>
                </form>
                {result && spots.length > 0 && (
                    <div className="search-result">
                        {spots.map(spot => (
                            <Link key={spot.id} exact="true" to={`/spots/${spot.id}`}>
                                <div className="search-card">
                                    <div className="search-image">
                                        
                                    </div>
                                    <div className="search-city">
                                        {spot.city}
                                    </div>
                                    <div className="search-state">
                                        {spot.state}
                                    </div>
                                </div>
                            </Link>
                        ))}
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
