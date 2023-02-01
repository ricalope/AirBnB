import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBookingsThunk, getBookingsThunk, updateBookingThunk, deleteBookingThunk } from '../../store/bookings';
import { Modal } from '../../context/Modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CurrentBookings.css';


function CurrentBookings() {

    const dispatch = useDispatch();

    const bookingsObj = useSelector(state => state.bookings.oneBook);
    const spotBookingsObj = useSelector(state => state.bookings.allBooks);
    const bookings = Object.values(bookingsObj);

    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDel, setShowDel ] = useState(false);
    const [ value, onChange ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ bookingId, setBookingId ] = useState(0);
    const [ spotId, setSpotId ] = useState(0);
    const [ display, setDisplay ] = useState({ startDate: '', endDate: '' })

    useEffect(() => {
        (async () => {
            await dispatch(getCurrentBookingsThunk())
        })()
    }, [ dispatch ])

    useEffect(() => {
        if (spotId > 0) {
            (async () => {
                await dispatch(getBookingsThunk(spotId))
            })()
        }
    }, [ spotId ])

    const setFields = data => {
        setSpotId(data.spotId);
        setBookingId(data.id);
        setDisplay({
            startDate: new Date(data.startDate).toDateString(),
            endDate: new Date(data.endDate).toDateString()
        });
        return
    }

    const displayDate = (start, end) => {
        //need to add display checks for
        //bookings months years apart
        start = new Date(start).toDateString()
        end = new Date(end).toDateString()
        const splitStart = start.split(' ');
        const splitEnd = end.split(' ');
        return `${splitStart[ 1 ]} ${splitStart[ 2 ]} - ${splitEnd[ 2 ]}, ${splitEnd[ 3 ]}`
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

    const blockedDates = ({ activeStartDate, date, view }) => {
        const today = new Date()
        if (date.toDateString() === today.toDateString()) {
            return true
        }
        for (let bookId in spotBookingsObj) {
            const start = new Date(spotBookingsObj[ bookId ].startDate);
            const end = new Date(spotBookingsObj[ bookId ].endDate);
            date = new Date(date);
            if (date >= start && date <= end) {
                return true
            }
        }
        return false
    }

    const onSubmit = async e => {
        e.preventDefault()

        const booking = {
            bookingId,
            "startDate": value[ 0 ],
            "endDate": value[ 1 ]
        }

        await dispatch(updateBookingThunk(booking))
        await dispatch(getCurrentBookingsThunk())
        setShowEdit(false)
        return
    }

    const onDelete = async () => {
        if (bookingId > 0) {
            await dispatch(deleteBookingThunk(bookingId))
            await dispatch(getCurrentBookingsThunk())
            setShowDel(false)
            return
        }
    }

    bookings.sort((a, b) => {
        if (new Date(a.startDate) > new Date(b.startDate)) {
            return 1
        } else if (new Date(a.startDate) < new Date(b.startDate)) {
            return -1
        }
        return 0
    })

    return (
        <>
            <div className="current-bookings-container">
                <div className="current-header">
                    <h2>Trips</h2>
                </div>
                <div className="current-card-container">
                    {bookings?.map(book => (
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
                                {new Date(book.endDate) > new Date() && (
                                    <>
                                        <div className="update-booking">
                                            <button className="update-btn" onClick={() => {
                                                setShowEdit(true)
                                                setFields(book)
                                            }}>
                                                Update Reservation
                                            </button>
                                        </div>
                                        <div className="delete-boooking">
                                            <button className="delete-btn" onClick={() => {
                                                setShowDel(true)
                                                setFields(book)
                                            }}>
                                                Cancel Reservation
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {showEdit && (
                    <Modal onClose={() => setShowEdit(false)}>
                        <form onSubmit={onSubmit}>
                            <div className="current-calendar">
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
                                <div className="current-dates-header">
                                    <h5>Currently scheduled trip dates:</h5>
                                </div>
                                <div className="current-dates">
                                    <p>{display.startDate} - {display.endDate}</p>
                                </div>
                                <div className="close-wrapper">
                                    <button className="close-cal" type="submit">
                                        update reservation
                                    </button>
                                    <button className="close-cal" onClick={() => setShowEdit(false)}>
                                        close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                )}
                {showDel && (
                    <Modal onClose={() => setShowDel(false)}>
                        <div className="current-delete">
                            <div className="conf-del">
                                Confirm you would like to cancel reservation?
                            </div>
                            <div className="delete-buttons">
                                <button className="delete-cancel" onClick={() => setShowDel(false)}>
                                    Cancel
                                </button>
                                <button className="delete-btn-modal" onClick={onDelete}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default CurrentBookings;
