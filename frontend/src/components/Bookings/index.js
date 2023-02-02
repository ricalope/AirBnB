import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBookingsThunk, addBookingThunk } from '../../store/bookings';
import Calendar from 'react-calendar';
import './Bookings.css';
import 'react-calendar/dist/Calendar.css';


function Bookings({ spot, spotId, reviews }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const bookingsObj = useSelector(state => state.bookings.allBooks);

    const [ value, onChange ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ days, setDays ] = useState(1);
    const [ showCalendar, setShowCalendar ] = useState(false);
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        (async () => {
            await dispatch(getBookingsThunk(spotId))
        })()
    }, [ dispatch ])

    useEffect(() => {
        if (startDate && endDate) {
            const between = (endDate - startDate)
            const daysBetween = Math.floor(between / 86400000)
            setDays(daysBetween)
        } else {
            setDays(1)
        }

        return () => setDays(1);
    }, [ startDate, endDate ])

    useEffect(() => {
        for (let bookId in bookingsObj) {
            const start = new Date(bookingsObj[bookId].startDate);
            const end = new Date(bookingsObj[bookId].endDate);

            if (start >= new Date(value[ 0 ]) && start <= new Date(value[ 1 ])) {
                setErrors(['Spot has already been booked for these dates. Please select different dates.'])
                return
            }
            if (end >= new Date(value[ 0 ]) && end <= new Date(value[ 1 ])) {
                setErrors(['Spot has already been booked for these dates. Please select different dates.'])
                return
            }
        }
    }, [ value ])

    const shortDate = date => {
        date = new Intl.DateTimeFormat('en-US').format(date).toString()
        return date;
    }

    const formattedPrice = price => {
        return Number(price).toFixed()
    }

    const totalFee = (price, stayDays, cleanFee, servFee) => {
        servFee = Math.floor(servFee * days);
        const total = (price * stayDays) + cleanFee + servFee;
        return total.toFixed()
    }

    const datePicker = (value, event) => {
        if (!startDate) {
            setStartDate(new Date(value))
        }
        if (startDate && startDate < new Date(value)) {
            setEndDate(new Date(value))
        }
        if (startDate && startDate > new Date(value)) {
            setEndDate(startDate)
            setStartDate(new Date(value))
        }
        if (startDate && endDate) {
            setStartDate(new Date(value))
            setEndDate('')
            onChange('')
        }
    }

    const calendarSubmit = async e => {
        e.preventDefault();

        if (errors.length > 0) {
            return;
        }

        const booking = {
            "spotId": spot.id,
            "startDate": value[ 0 ],
            "endDate": value[ 1 ]
        }
        await dispatch(addBookingThunk(booking));
        await dispatch(getBookingsThunk(spotId));
        setShowCalendar(false);
        history.push('/bookings')
        return
    }

    const blockedDates = ({ activeStartDate, date, view }) => {
        const today = new Date()
        if (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            return true
        }
        for (let bookId in bookingsObj) {
            const start = new Date(bookingsObj[ bookId ].startDate)
            const end = new Date(bookingsObj[ bookId ].endDate)
            date = new Date(date)
            if (date >= start && date <= end) {
                return true
            }
        }
        return false
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
                <form onSubmit={calendarSubmit}>
                    <div className="bookings-cal-container">
                        <div className="bookings-ci" onClick={() => setShowCalendar(!showCalendar)}>
                            <p>CHECK-IN</p>
                            <input
                                disabled={true}
                                className="book-input"
                                value={startDate ? shortDate(startDate) : 'Select Date'}
                            />
                        </div>
                        <div className="bookings-co" onClick={() => setShowCalendar(!showCalendar)}>
                            <p>CHECKOUT</p>
                            <input
                                disabled={true}
                                value={endDate ? shortDate(endDate) : 'Select Date'}
                                className="book-input"
                            />
                        </div>
                    </div>
                    {showCalendar && (
                        <div className="cal-wrapper">
                            <Calendar
                                value={value}
                                onChange={onChange}
                                returnValue={"range"}
                                onClickDay={datePicker}
                                selectRange={true}
                                minDate={new Date()}
                                goToRangeStartOnSelect={true}
                                tileDisabled={blockedDates}
                                showNeighboringMonth={false}
                            />
                            <div className="close-wrapper">
                                <button className="close-cal" onClick={() => setShowCalendar(false)}>
                                    close
                                </button>
                            </div>
                            {errors.length > 0 && (
                                <div className="errors-container">
                                    {errors.map((error, idx) => (
                                        <div key={idx} className="errors">
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
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
                </form>
                <div className="bookings-fees-container">
                    <div className="bookings-fees-disclaimer">
                        <p className="b-f-font">{formattedPrice(spot.price)} x {days}</p>
                        <p className="b-f-font">Cleaning fee</p>
                        <p className="b-f-font">Service Fee</p>
                    </div>
                    <div className="bookings-fees-totals">
                        <p className="b-f-font">${formattedPrice(spot.price) * days}</p>
                        <p className="b-f-font">$147</p>
                        <p className="b-f-font">${formattedPrice(((spot.price * 0.142) * days))}</p>
                    </div>
                </div>
                <div className="bookings-total-container">
                    <div className="bookings-total-title">
                        <p className="b-f-bold">Total before taxes</p>
                    </div>
                    <div className="bookings-total-price">
                        <p className="b-f-bold">${totalFee(spot.price, days, (spot.price * 0.142), 147)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bookings;
