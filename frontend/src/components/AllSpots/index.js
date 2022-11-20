import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllSpots.css';

import { getAllSpots } from '../../store/spots';

const AllSpots = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => Object.values(state.spots.allSpots));

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]);

  useEffect(() => {
    console.log(allSpots);
  })

  if (!allSpots) return 'Loading all available spots!...'

  return (
    <div>
      <div className='titlePage'>
        <h1>Welcome to SkyBnB!</h1>
      </div>
      <div className='spotCards'>
        {allSpots.map(spot =>
          <div className='spotCard'>
            <Link to={`/spots/${spot.id}`}>
              <div className='imageDiv'>
                <img src={spot.previewImage} className='image'></img>
              </div>

              <div className='cardInfo'>
                <div>
                  {spot.city}, {spot.state}
                </div>
                <div>
                  {spot.avgRating}
                </div>
              </div>
              
              <div>
                {spot.price}
                <span>{' '}night</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllSpots;
