import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../utils/queries';

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_CURRENT_USER);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (data && data.me) {
      setCurrentUser(data.me);
    }
  }, [data]);

  const renderRibbon = (month, participated) => {
    const ribbonImageUrl = participated ? 'color-ribbon.jpg' : 'gray-ribbon.jpg';
    return <img src={ribbonImageUrl} alt={`${month} Ribbon`} />;
  };

  return (
  <div>
    <h1>Profile</h1>
    {loading && <p>Loading...</p>}
    {error && <p>Error fetching user data: {error.message}</p>}
    {currentUser && (
      <div>
        <img src='' alt="Profile" style={{ float: 'left', marginRight: '20px' }} />
        <div>
          <p><strong>About Me</strong></p>
          <p>{currentUser.bio}</p>
          <h2>Favorite Details</h2>
          <ul className="list-unstyled">
            <li><strong>Favorite Book:</strong> </li>
            <li><strong>Favorite Coffee:</strong> </li>
            <li><strong>Favorite Author:</strong> </li>
            <li><strong>Favorite Genre:</strong> </li>
            <li><strong>Favorite Quote:</strong> </li>
            <li><strong>Favorite Place to Read:</strong> </li>
          </ul>
        </div>
      </div>
    )}
    <div>
      <h2>Reading Rewards</h2>
      <div>
        {currentUser &&
          Object.entries(currentUser.readingRewards).map(([month, participated]) => (
            <div key={month} style={{ display: 'inline-block', marginRight: '10px' }}>
              {renderRibbon(month, participated)}
              <p>{month}</p>
            </div>
          ))}
      </div>
    </div>
  </div>
);
}

export default Profile;
