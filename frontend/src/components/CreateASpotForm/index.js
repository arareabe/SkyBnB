import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createASpot } from '../../store/spots';

const CreateASpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (!address.length) errors.push('Address cannot be empty')
    if (!city.length) errors.push('City cannot be empty')
    if (!state.length) errors.push('State cannot be empty')
    if (!country.length) errors.push('Country cannot be empty')
    if (!lat) errors.push('Latitude cannot be empty')
    if (!lng) errors.push('Longitude cannot be empty')
    if (!name.length) errors.push('Name cannot be empty')
    if (!description.length) errors.push('Description cannot be empty')
    if (!price) errors.push('Price cannot be empty')
    if (!imgUrl) errors.push('Image URL cannot be empty')

    setValidationErrors(errors);
  }, [address, city, state, country, lat, lng, name, description, price, imgUrl])

  const submitHandler = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };

    if (!validationErrors.length) {
      let newSpot = await dispatch(createASpot(payload, imgUrl));

      if (newSpot) history.push(`/spots/${newSpot.id}`);

      setAddress('')
      setCity('')
      setState('')
      setCountry('')
      setLat('')
      setLng('')
      setName('')
      setDescription('')
      setPrice('')
      setValidationErrors([]);
      setHasSubmitted(false);
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>SkyBnB your new home!</h2>
        <div>
          <input
            type='text'
            placeholder='address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            type='text'
            placeholder='city'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <input
            type='text'
            placeholder='state'
            value={state}
            onChange={e => setState(e.target.value)}
          />
          <input
            type='text'
            placeholder='country'
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <input
            type='number'
            placeholder='latitude'
            value={lat}
            onChange={e => setLat(e.target.value)}
          />
          <input
            type='number'
            placeholder='longitude'
            value={lng}
            onChange={e => setLng(e.target.value)}
          />
          <input
            type='text'
            placeholder='name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type='number'
            placeholder='$$$'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            type='text'
            placeholder='image'
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
          />
        </div>

        {hasSubmitted && validationErrors.length > 0 && (
          <div>
            To submit a new SkyBnB, please handle the following errors:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button type='submit'>Create your new SkyBnB!</button>
        </div>
      </form>
    </div>
  )
};

export default CreateASpotForm;