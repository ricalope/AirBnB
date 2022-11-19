import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupForm({ setShowModal }) {
   const dispatch = useDispatch();

   const [ email, setEmail ] = useState('');
   const [ username, setUsername ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ firstName, setFirstName ] = useState('');
   const [ lastName, setLastName ] = useState('');
   const [ confirmPassword, setConfirmPassword ] = useState('');
   const [ errors, setErrors ] = useState([]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         setErrors([]);
         return dispatch(sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password
         }))
            .then(() => setShowModal(false))
            .catch(async (res) => {
               const data = await res.json();
               if (data && data.errors) setErrors(data.errors);
            })
      }
      return setErrors([ 'Confirm Password field must be the same as the Password field' ]);
   }

   return (
      <div className="signup-container">
         <form onSubmit={handleSubmit}>
            <ul>
               {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
               ))}
            </ul>
            <label>
               Email
               <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </label>
            <label>
               Username
               <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />
            </label>
            <label>
               First Name
               <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
               />
            </label>
            <label>
               Last Name
               <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
               />
            </label>
            <label>
               Password
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </label>
            <label>
               Confirm Password
               <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
               />
            </label>
            <div className="signup-button"><button type="submit">Sign Up</button></div>
         </form>
      </div>
   );
}

export default SignupForm;
