import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';
import { Modal } from '../../context/Modal';
import logo from '../../assets/android-chrome-512x512.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector(state => state.session.user);
   const [showModal, setShowModal] = useState(false);
   const [login, setLogin] = useState(true);

   return (
      <nav className="nav-bar">
         <div className="nav-left">
            <ul>
               <li id="home-button">
                  <NavLink className="nav-home" exact to="/">
                  <i className="fa-sharp fa-solid fa-house"></i>
                  </NavLink>
                  {isLoaded && (
                     <ProfileButton
                        user={sessionUser}
                        setLogin={setLogin}
                        setShowModal={setShowModal}
                     />
                  )}
               </li>
               {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                     {login ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal} />}
                  </Modal>
               )}
            </ul>
         </div>
         <div className="nav-center">
            <img
               className="logo"
               src={logo}
               alt="tiny-hub-logo"
               style={{ width: 40, height: 40 }} />
            <h1>tiny hub</h1>
         </div>
         <div className="nav-right">
            <NavLink to="/spots/new">Create a Tiny Hub</NavLink>
         </div>
      </nav>
   );
}

export default Navigation;
