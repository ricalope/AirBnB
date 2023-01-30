import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsThunk } from '../../store/bookings';
import Calendar from 'react-calendar';
import './Bookings.css';
import 'react-calendar/dist/Calendar.css';


function Bookings({ spot, reviews }) {

    const dispatch = useDispatch();

    const bookingsObj = useSelector(state => state.bookings.allBooks);
    const bookings = Object.values(bookingsObj);

    const [ value, onChange ] = useState(new Date());
    const [ days, setDays ] = useState(1);
    const [ showCalendar, setShowCalendar ] = useState(false);

    useEffect(() => {
        dispatch(getBookingsThunk(spot.id))
    }, [ dispatch, spot.id ])

    const shortDate = date => {
        date = new Intl.DateTimeFormat('en-US').format(date).toString()
        return date;
    }

    const randomFee = () => {
        const min = 100
        const max = 200
        const randomized = Math.floor(Math.random() * (max - min) + min)
        return randomized
    }

    const formattedPrice = price => {
        return Number(price).toFixed()
    }

    const totalFee = (price, stayDays, cleanFee, servFee) => {
        servFee = Math.floor(servFee * days);
        const total = (price * stayDays) + cleanFee + servFee;
        return total.toFixed()
    }

    return (
        <>
            <div className="bookings-main-container">
                <div className="bookings-rev-container">
                    <div className="bookings-price-div">
                        <h4 id="book-h4">${Number(spot.price).toFixed()}</h4>
                        <p id="b-night">night</p>
                    </div>
                    <div className="bookings-rev-div">
                        <div className="bookings-rating">
                            {`★ ${spot?.avgStarRating ? Number(spot?.avgStarRating).toFixed(1) : ' 0'}`}
                        </div>
                        <span>•</span>
                        <div className="bookings-rev">{`${reviews.length} reviews`}</div>
                    </div>
                </div>
                <div className="bookings-cal-container">
                    <div className="bookings-ci">
                        <p>CHECK-IN</p>
                        <p>{shortDate(new Date())}</p>
                    </div>
                    <div className="bookings-co">
                        <p>CHECKOUT</p>
                        <p>{shortDate(new Date())}</p>
                    </div>
                </div>
                <div className="bookings-res-container">
                    <div className="bookings-res-button">
                        <button className="reserve-button">
                            Reserve
                        </button>
                    </div>
                    <div className="bookings-res-disclaimer">
                        <p>You won't be charged yet</p>
                    </div>
                </div>
                <div className="bookings-fees-container">
                    <div className="bookings-fees-disclaimer">
                        <p>{formattedPrice(spot.price)} x {days}</p>
                        <p>Cleaning fee</p>
                        <p>Service Fee</p>
                    </div>
                    <div className="bookings-fees-totals">
                        <p>${formattedPrice(spot.price) * days}</p>
                        <p>${randomFee()}</p>
                        <p>${formattedPrice(((spot.price * 0.142) * days))}</p>
                    </div>
                </div>
                <div className="bookings-total-container">
                    <div className="bookings-total-title">
                        <p>Total before taxes</p>
                    </div>
                    <div className="bookings-total-price">
                        <p>${totalFee(spot.price, days, (spot.price * 0.142), randomFee())}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bookings;
