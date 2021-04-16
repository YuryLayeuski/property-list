import React, { useState, useEffect } from 'react'
import Loading from './Loading';
import Property from './Property';

const url = 'https://api.simplyrets.com/properties';
// storing username and password inside .env file
const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;
// get properties data from localStorage if data exists
const getStorageProperties = () => {
  let properties = localStorage.getItem('properties');
  if (properties) {
    return (properties = JSON.parse(localStorage.getItem('properties')));
  } else {
    return [];
  }
};
// get favorite property data from localStorage if data exists
const getStorageFavorite = () => {
  let favorite = localStorage.getItem('favorite');
  if (favorite) {
    const favoriteNumber = JSON.parse(favorite);
    return favoriteNumber;
  } else {
    return [];
  }
};

function PropertyList() {
  const [loading, setLoading] = useState(false);
  // get initial state from localStorage cache if it exists, otherwise fetch data
  const [properties, setProperties] = useState(getStorageProperties());
  // get favorite data from localStorage cache if it exists, otherwise initial state will be empty array
  const [favorite, setFavorite] = useState(getStorageFavorite());

  const fetchProperties = async () => {
    // display loading while fetching data
    setLoading(true)
    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          "Content-Type": "text/plain",
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        },
      });
      const data = await response.json();
      // set data from simplyRets to local storage
      if(data){
        localStorage.setItem('properties', JSON.stringify(data));
      }
      // set initial state with data from simplyRets
      setProperties(data)
      setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  // fetch data only if it not exist in local storage
  useEffect(() => {
    if (localStorage.getItem('properties')) {
      return;
    } else {
      fetchProperties();
    }
  }, [])

  // handle when user select favorite property
  const handleFavorite = (id) => {
    localStorage.setItem('favorite', JSON.stringify([...favorite, id]));
    setFavorite([...favorite, id])
  }

  if(loading){
    return <Loading/>
  }

  return (
    <section className='section'>
      <div className='property-center'>
        {properties.map((property) => {
          return (
            <Property
            key={property.mlsId}
            handleFavorite={() => handleFavorite(property.mlsId)}
            favoriteState={favorite}
            {...property}
            />
          )
        })}
      </div>
    </section>
  )
}

export default PropertyList