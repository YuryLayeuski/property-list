import React from 'react'
import {ReactComponent as HeartFill} from '../assets/heart-fill.svg';
import {ReactComponent as HeartStroke} from '../assets/heart-stroke.svg';

const Property = ({photos, listPrice, property, address, listDate, handleFavorite, mlsId}) => {
  // convert listed date
  const listedDate = new Date(listDate).toLocaleDateString("en-US");
  // calculate total baths with a partial baths
  const totalBath = property.bathsFull + property.bathsHalf * 0.5;

  // get the favorite properties from local storage
  let favoriteProperty;
  const favoriteDataFromLocalStorage = localStorage.getItem('favorite');
  if(favoriteDataFromLocalStorage){
    favoriteProperty = favoriteDataFromLocalStorage;
  }else{
    favoriteProperty = [];
  }

  return (
    <div className='grid-container'>
      <div className='grid-item'>
        <div className='container'>
          <img className='image' src={photos[0]} alt='property'/>
          <button onClick={handleFavorite} className='icon-heart'>
            {
              // display red color heart based on the favorite properties from local storage
              // added 'data-testid' attribute for the cypress tests
              favoriteProperty.indexOf(mlsId) !== -1 ? <HeartFill data-testid="favorite"/> : <HeartStroke data-testid="not-favorite"/>
            }
          </button>
        </div>
        <div className='property-footer'>
          <div className='property-info'>{property.bedrooms} BR | {totalBath} Bath | {property.area} Sq Ft</div>
          <div className='listing-price'>${new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(listPrice)}</div>
          <div className='address'>{address.full}</div>
          <div className='listing-date'>Listed: {listedDate}</div>
        </div>
      </div>
    </div>
  )
}

export default Property