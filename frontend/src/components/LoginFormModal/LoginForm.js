import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginForm({ setShowModal }) {
   const dispatch = useDispatch();
   const [ credential, setCredential ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ errors, setErrors ] = useState([]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
         .then(() => setShowModal(false))
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.message) setErrors([data.message]);
         });
   }

   const demoUserLogin = async (user, pass) => {
      setCredential(user)
      setPassword(pass)
      return
   }

   return (
      <div className="login-container">
        <h1>Tiny Hub</h1>
         <form onSubmit={handleSubmit}>
            <ul>
               {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
               Username or Email
               <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
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
            <div className="button-div">
               <div className="log-in"><button type="submit">Log In</button></div>
               <div className="sign-up"><button onClick={() => demoUserLogin('Demo-lition', 'password')}>Demo User</button></div>
            </div>
         </form>
      </div>
   );
}

export default LoginForm;
