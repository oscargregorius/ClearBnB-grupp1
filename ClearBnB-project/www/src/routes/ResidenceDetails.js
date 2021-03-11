import React, {useContext, useEffect, useState} from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { ResidenceContext } from '../contexts/ResidenceContextProvider';
import { BookingContext } from '../contexts/BookingContextProvider'
import { FeatureContext } from '../contexts/FeatureContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import DatePicker from 'react-datepicker'
import '../style/ResidenceDetails.css'
import 'react-datepicker/dist/react-datepicker.css'

const ResidenceDetails = () => {

  const history = useHistory();
  const { id } = useParams();
  const { residences, updateResidence } = useContext(ResidenceContext);
  const { whoAmI } = useContext(UserContext);
  const { addBooking } = useContext(BookingContext);
  const { getSpecificFeature } = useContext(FeatureContext);
  const residence = residences.find(r => r._id === id);

  const [features, setFeatures] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [unFilledFields, setunFilledFields] = useState(null);
  const [showConfirmPage, setShowConfirmPage] = useState(false);


  const bookResidence = () => {

    if (startDate === null && endDate === null) {
      setunFilledFields(true);
      return;
    }    
    setunFilledFields(false);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setTotalPrice(differenceInDays * residence.price);

    const startDateInMillis = Math.round(new Date(startDate).getTime() / 1000);
    const endDateInMillis = Math.round(new Date(endDate).getTime() / 1000);
    const oneDayInMillis = 86400000 / 1000;
    const allTheDaysBooked = [];

    for (let i = startDateInMillis; i <= endDateInMillis; i += oneDayInMillis){
      allTheDaysBooked.push(i);
    }

    const bookedDaysObj = {
      bookedDays: allTheDaysBooked
    }

    updateResidence(residence._id, bookedDaysObj);
    
    setShowConfirmPage(true);
    const bookingObj = {
      startDate: startDate,
      endDate: endDate,
      price: totalPrice,
      userId: null,
      residenceId: id,
    }
    //Method to add bookingObj to DB via context.
    //addBooking(bookingObj)
  }

  const filterForStartDate = date => {
    if (endDate === null) {
      if (residence.bookedDays !== null) {
        const day = Math.round(new Date(date).getTime() / 1000);
        return !residence.bookedDays.includes(day);
      }
      else {
        return true;
      }
    }
    if (residence.bookedDays !== null) {
      const day = Math.round(new Date(date).getTime() / 1000);
      const departureDate = Math.round(new Date(endDate).getTime() / 1000)
      return departureDate > day && !residence.bookedDays.includes(day)
    } else {
      const day = Math.round(new Date(date).getTime() / 1000);
      const departureDate = Math.round(new Date(endDate).getTime() / 1000)
      return departureDate > day;
    }  
  }

  const filterForEndDate = date => {
    if (residence.bookedDays !== null) {
      const day = Math.round(new Date(date).getTime() / 1000);
      const arrivalDate = Math.round(new Date(startDate).getTime() / 1000)
      return arrivalDate < day && !residence.bookedDays.includes(day)
    } else {
      const day = Math.round(new Date(date).getTime() / 1000);
      const arrivalDate = Math.round(new Date(startDate).getTime() / 1000)
      return arrivalDate < day;
    }  
  }


  useEffect(() => {    
    if (startDate !== null && endDate !== null) {
      setunFilledFields(false);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setTotalPrice(differenceInDays * residence.price);
    } else {
      setTotalPrice(null);
    }
  }, [startDate, endDate])
  
  useEffect(() => {
    console.log(residence);
    if (residence) {
      setFeatures(...getSpecificFeature(residence.featuresId))  
    };    
  },[residence])

  return (
    <div className="residenceDetail">
      {!showConfirmPage && residence && <div className="inner">
        <div className="images">
          {residence.imageURLs.map((img) => {
            return (<img key={img} src={img} alt="" />)
          })}
        </div>
        <div className="infoWrapper">
          <div className="desc">
            <h1>{residence.title}</h1>
            <p><span>Country: </span>{residence.country}</p>
            <p><span>City: </span>{residence.city}</p>
            <p><span>Address: </span>{residence.address}</p>
            <p><span>Type: </span>{residence.type}</p>
            <p><span>Price per night: </span>{residence.price}€</p>
            <p><span>Description: </span>{residence.description}</p>
          </div>
          {features && <div className="features">
            <p className={features.shower ? '' : 'dontExist'}><i className="material-icons">shower</i> Shower</p>
            <p className={features.firstAidKit ? '' : 'dontExist'}><i className="material-icons">healing</i> first aid kit</p>
            <p className={features.parking ? '' : 'dontExist'}><i className="material-icons">local_parking</i> parking</p>
            <p className={features.stove ? '' : 'dontExist'}><i className="material-icons">kitchen</i> stove</p>
            <p className={features.oven ? '' : 'dontExist'}><i className="material-icons">kitchen</i> oven</p>
            <p className={features.microwave ? '' : 'dontExist'}><i className="material-icons">kitchen</i> microwave</p>
            <p className={features.tv ? '' : 'dontExist'}><i className="material-icons">tv</i> TV</p>
            <p className={features.coffeeMaker ? '' : 'dontExist'}><i className="material-icons">free_breakfast</i> Coffee maker</p>
            <p className={features.wifi ? '' : 'dontExist'}><i className="material-icons">wifi</i> WiFi</p>
            <p className={features.balcony ? '' : 'dontExist'}><i className="material-icons">straighten</i> Balcony</p>
            <p className={features.iron ? '' : 'dontExist'}><i className="material-icons">scanner</i> Iron</p>
            <p className={features.pool ? '' : 'dontExist'}><i className="material-icons">pool</i> Pool</p>
            <p className={features.fridge ? '' : 'dontExist'}><i className="material-icons">kitchen</i> Fridge</p>
            <p className={features.dishwasher ? '' : 'dontExist'}><i className="material-icons">kitchen</i> Dishwasher</p>
          </div>}
        </div>
        {whoAmI && <div className="dates">
          <DatePicker className="startDate"
            placeholderText="Arrival.."
            selected={startDate}
            onChange={date => setStartDate(date)}
            minDate={residence.startDate * 1000}
            maxDate={residence.endDate * 1000}
            filterDate={filterForStartDate}
            isClearable
          />
          <DatePicker className="endDate"
            placeholderText="Departure.."
            selected={endDate}
            onChange={date => setEndDate(date)}
            minDate={residence.startDate * 1000}
            maxDate={residence.endDate * 1000}
            filterDate={filterForEndDate}
            isClearable
          />
        </div>}
        {totalPrice && <p><span>Total price: </span>{totalPrice} €</p>}
        {unFilledFields && <p className="valCheck">You have to pick a start date and a end date to continue..</p>}
        {whoAmI && <button onClick={bookResidence} className="book-btn">Book</button>}
        {!whoAmI && <button className="book-btn" onClick={() => history.push("/login")}>Login to book</button>}
      </div>}
      {showConfirmPage && <div className="confirm">
        <h1>Thank you.</h1>
        <h4>Your booked residence was completed succsessfully.</h4>
        <img src={residence.imageURLs[0]} alt="" />
        <p><span>Address: </span>{ residence.address }</p>
        <p><span>Start date: </span>{new Date(startDate).toString().substr(0,15)}</p>
        <p><span>End date: </span>{new Date(endDate).toString().substr(0, 15)}</p>
        <p><span>Total price: </span>{totalPrice} €</p>
        <div className="btns">
          <button onClick={() => history.push("/")}>Homepage</button>
          <button>My bookings</button>
        </div>  
      </div>}
    </div>
  );
}

export default ResidenceDetails;