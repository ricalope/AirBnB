import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Spots from './components/Spots';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';

function App() {
   const dispatch = useDispatch();
   const [ isLoaded, setIsLoaded ] = useState(false);

   // useEffect(() => {
   //    dispatch(() => setIsLoaded(true));
   // }, [dispatch]);

   useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
   }, [ dispatch ]);

   return (
      <>
         <Navigation isLoaded={isLoaded} />
         {isLoaded && (
            <Switch>
               <Route exact path="/">
                  <Spots />
               </Route>
            </Switch>
         )}
      </>
   );
}

export default App;
