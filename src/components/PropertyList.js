import React, { useState, useEffect } from 'react'
import Loading from './Loading';
import Property from './Property';

const url = 'https://api.simplyrets.com/properties';
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
  // get the initial state from the localStorage cache if it exists
  // otherwise fetch data
  const [properties, setProperties] = useState(getStorageProperties());
  const [favorite, setFavorite] = useState(getStorageFavorite());

  const fetchProperties = async () => {
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
      // Storage.setObj('properties', data)
      localStorage.setItem('properties', JSON.stringify(data));
      setProperties(data)
      setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties();
  }, [])

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