import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector(state => state.session.user);

   let sessionLinks;
   if (sessionUser) {
      sessionLinks = (
         <ProfileButton user={sessionUser} />
      );
   } else {
      sessionLinks = (
         <>
            <LoginFormModal />
            <SignupFormModal />
         </>
      );
   }

   return (
      <nav className="nav-bar">
         <div className="nav-left">

         </div>
         <div className="nav-center">
            <h1>Tiny Hub</h1>
         </div>
         <div className="nav-right">
            <ul>
               <li id="home-button">
                  <NavLink className="nav-home" exact to="/">Home</NavLink>
                  {isLoaded && sessionLinks}
               </li>
            </ul>
         </div>
      </nav>
   );
}

export default Navigation;
