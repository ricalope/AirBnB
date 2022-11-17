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
   const [ showModal, setShowModal ] = useState(false);
   const [ login, setLogin ] = useState(true);

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
