import React, { useState, useContext } from 'react';
import { ResidenceContext } from '../contexts/ResidenceContextProvider';
import { useParams,useHistory } from 'react-router-dom'

const MyRentalDetailPage = () => {

  const { id } = useParams();
  const { residences, updateResidence } = useContext(ResidenceContext);
  let residence = residences.find(r => r._id === id);

  return (
    <div className="myRentalDetailPage">
      <div className="images">
          {residence.imageURLs.map((img) => {
            return (<img key={img} src={img} alt="" />)
          })}
        </div>
        <div className="infoWrapper">
          <div className="desc">
            <p className="resTitle">{residence.title}</p>
            <p><span>Country: </span>{residence.country}</p>
            <p><span>City: </span>{residence.city}</p>
            <p><span>Address: </span>{residence.address}</p>
            <p><span>Type: </span>{residence.type}</p>
            <p><span>Price per night: </span>{residence.price}€</p>
            <p><span>Residence limit: </span>{residence.residenceLimit}</p>
            <p><span>Description: </span>{residence.description}</p>
        </div>
        </div>
    </div>
  );
}

export default MyRentalDetailPage;