import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Function to render ribbon for each month
  const renderRibbon = (month, participated) => {
    const ribbonImageUrl = participated ? 'color-ribbon.jpg' : 'gray-ribbon.jpg';
    return <img src={ribbonImageUrl} alt={`${month} Ribbon`} />;
  };

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <img src={userData.profilePhotoUrl} alt="Profile" style={{ float: 'left', marginRight: '20px' }} />
          <div>
            <h2>About Me</h2>
            <p>Favorite Book: {userData.aboutMe.favoriteBook}</p>
            <p>Favorite Coffee: {userData.aboutMe.favoriteCoffee}</p>
            <p>Favorite Author: {userData.aboutMe.favoriteAuthor}</p>
            <p>Favorite Genre: {userData.aboutMe.favoriteGenre}</p>
            <p>Favorite Quote: {userData.aboutMe.favoriteQuote}</p>
            <p>Favorite Place to Read: {userData.aboutMe.favoritePlaceToRead}</p>
          </div>
        </div>
      )}
      <div>
        <h2>Reading Rewards</h2>
        <div>
          {userData &&
            Object.entries(userData.readingRewards).map(([month, participated]) => (
              <div key={month} style={{ display: 'inline-block', marginRight: '10px' }}>
                {renderRibbon(month, participated)}
                <p>{month}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
