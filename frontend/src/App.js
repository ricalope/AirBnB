import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Spots from './components/Spots';
import OneSpot from './components/OneSpot';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Reviews from './components/Reviews';
import CurrentBookings from './components/CurrentBookings';

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
                    <Route exact path="/spots/:spotId">
                        <OneSpot />
                    </Route>
                    <Route exact path="/spots/:spotId/reviews">
                        <Reviews />
                    </Route>
                    <Route exact path="/bookings">
                        <CurrentBookings />
                    </Route>
                    <Route>
                        <h2>Page Not Found</h2>
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
