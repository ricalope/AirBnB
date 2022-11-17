import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, setLogin, setShowModal }) {
   const dispatch = useDispatch();
   const history = useHistory();
   const [ showMenu, setShowMenu ] = useState(false);

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      if (!showMenu) return;
      const closeMenu = () => {
         setShowMenu(false);
      }
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
   }, [ showMenu ]);

   const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      history.push("/");
   }

   return (
      <div>
         <button className="profile-button" onClick={openMenu}>
            <div className="bars">
               <i className="fa-solid fa-bars" />
            </div>
            <div className="user">
               <i class="fa-solid fa-circle-user" />
            </div>
         </button>
         {showMenu && (user ?
            <ul className="profile-dropdown">
               <div className="profile-container">
                  <div className="profile-username">
                     <li>{user.username}</li>
                  </div>
                  <div className="profile-email">
                     <li>{user.email}</li>
                  </div>
                  <div className="profile-create">
                     <li>
                        <NavLink to="/spots/new">Create a Tiny Hub</NavLink>
                     </li>
                  </div>
                  <div className="profile-logout">
                     <li>
                        <button onClick={logout}>Log Out</button>
                     </li>
                  </div>
               </div>
            </ul> :
            <ul className="profile-dropdown">
               <div className="profile-container">
                  <li>
                     <div className="profile-login">
                        <button onClick={() => {
                           setLogin(true)
                           setShowModal(true)
                        }}>Log In</button>
                     </div>
                  </li>
                  <li>
                     <div className="profile-signup">
                        <button onClick={() => {
                           setLogin(false)
                           setShowModal(true)
                        }}>Sign Up</button>
                     </div>
                  </li>
               </div>
            </ul>
         )}
      </div>
   );
}

export default ProfileButton;
