import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBookingsThunk } from '../../store/bookings';
import { Modal } from '../../context/Modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CurrentBookings.css';


function CurrentBookings() {

    const dispatch = useDispatch();

    const bookingsObj = useSelector(state => state.bookings.allBooks);
    const bookings = Object.values(bookingsObj);

    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDel, setShowDel ] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getCurrentBookingsThunk())
        })()
    }, [ dispatch ])

    const displayDate = (start, end) => {
        //need to add display checks for
        //bookings months years apart
        start = new Date(start).toDateString()
        end = new Date(end).toDateString()
        const splitStart = start.split(' ');
        const splitEnd = end.split(' ');
        return `${splitStart[ 1 ]} ${splitStart[ 2 ]} - ${splitEnd[ 2 ]}, ${splitEnd[ 3 ]}`
    }

    return (
        <>
            <div className="current-bookings-container">
                <div className="current-header">
                    <h2>Trips</h2>
                </div>
                <div className="current-card-container">
                    {bookings.map(book => (
                        <div key={book.id} className="current-booking-card">
                            <div className="curr-card-img">
                                <img src={book.Spot.previewImage} className="c-c-image" alt="tiny house" />
                            </div>
                            <div className="city-date-header">
                                <div className="curr-card-city">
                                    <p id="city-p">{book.Spot.city}</p>
                                </div>
                                <div className="curr-card-dates">
                                    <p id="date-p">{displayDate(book.startDate, book.endDate)}</p>
                                </div>
                            </div>
                            <div className="curr-card-btns">
                                <div className="update-booking">
                                    <button className="update-btn" onClick={() => setShowEdit(true)}>
                                        Update Reservation
                                    </button>
                                </div>
                                <div className="delete-boooking">
                                    <button className="delete-btn" onClick={() => setShowDel(true)}>
                                        Cancel Reservation
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showEdit && (
                    <Modal onClose={() => setShowEdit(false)}>
                        <div className="current-calendar">
                            <Calendar />
                        </div>
                    </Modal>
                )}
                {showDel && (
                    <Modal onClose={() => setShowDel(false)}>
                        <div className="current-delete">
                            <div className="conf-del">
                                confirm?
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default CurrentBookings;
