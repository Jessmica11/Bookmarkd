import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOOK_CLUB_DETAILS } from './queries';

const BookClubDetails = () => {
  // uses `useParams` to retrieve value of the route parameter `:bookClubId`
  const { bookClubId } = useParams();
  // this will return an object with three properties: `loading`, `error`, and `data`
  const { loading, error, data } = useQuery(GET_BOOK_CLUB_DETAILS, {
    variables: { bookClubId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // if successful, the `data` object will contain the `bookClubById` data
  const bookClub = data.bookClubById; 

  return (
    // this will return the book club details
    <div>
      <h1>Book Club {bookClubId}</h1>
    </div>
  );
};

export default BookClubDetails;
