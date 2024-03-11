import React from 'react';
import bookClubsData from '../BookClubs/BookClubsData';

const BookClubDetails = ({ bookClubId }) => {
  // Find the book club details based on the bookClubId
  const bookClub = bookClubsData.find(club => club.id === bookClubId);

  // if not found for some reason, return a message to the user on the screen
  if (!bookClub) {
    return <div>Book club not found!</div>;
  }

  return (
    <div>
      <h1>{bookClub.name}</h1>
      <img src={bookClub.image} alt={bookClub.name} />
      <p>{bookClub.desc}</p>
    </div>
  );
};

export default BookClubDetails;
