import React from 'react';
import bookClubsData from '../BookClubs/BookClubsData';

const BookClubDetails = ({ bookClubId }) => {
    // find the bookclub from the bookclubID in the data file
    const bookClub = bookClubsData.find(club => club.id === bookClubId);

    // if not found for some reason, return a message to the user on the screen
    if (!bookClub) {
        return <div>Book club not found!</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>{bookClub.name}</h1>
            <img src={bookClub.image} alt={bookClub.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }} />
            <p className='mt-3'>{bookClub.desc}</p>
        </div>
    );
};

export default BookClubDetails;
