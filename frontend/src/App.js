import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Spots from './components/Spots';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import AddSpot from './components/AddSpot';

function App() {
   const dispatch = useDispatch();
   const [ isLoaded, setIsLoaded ] = useState(false);

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
               <Route exact path="/spots/new">
                  <AddSpot />
               </Route>
            </Switch>
         )}
      </>
   );
}

export default App;
