import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER, QUERY_BOOK_CLUB_COMMENTS } from '../utils/queries';
import { JOIN_BOOK_CLUB } from '../utils/mutations';
import BookClubDetails from '../components/BookClubs/BookClubDetails.jsx';
import CommentForm from '../components/CommentForm/CommentForm.jsx';
import CommentList from '../components/CommentList/CommentList.jsx';

const BookClub = () => {
    const { bookClubId } = useParams();
    const [joined, setJoined] = useState(false); 

    // useMutation hook for JOIN_BOOK_CLUB mutation
    const [joinBookClub] = useMutation(JOIN_BOOK_CLUB);

    // get the current user's data
    const { loading: userLoading, data: userData } = useQuery(QUERY_CURRENT_USER);

    // Fetch comments for the book club
    const { loading: commentsLoading, data: commentsData } = useQuery(QUERY_BOOK_CLUB_COMMENTS, {
        variables: { bookClubId },
    });

    const handleSubmitComment = (newComment) => {
        // Here you can implement the logic to submit the comment to the backend
    };

    const handleJoinClub = async () => {
        try {
            // get the user ID from the userData object
            const userId = userData?.me?._id;
            if (!userId) {
                console.error('User ID not found.');
                return;
            }
            
            // call the JOIN_BOOK_CLUB mutation so the user can join the book club
            await joinBookClub({ variables: { userId, bookClubId } });
            // if mutation works, update the joined state
            setJoined(true);
        } catch (error) {
            console.error('Error joining book club:', error);
            // error handling
        }
    };

    if (userLoading || commentsLoading) return <p>Loading...</p>;

    return (
        <div>
            <BookClubDetails bookClubId={bookClubId} />
            <div>
                {/* show the join button if not logged in */}
                {!joined && (
                    <button onClick={handleJoinClub}>Join Club</button>
                )}
                {/* tell the user it worked */}
                {joined && <p>Successfully joined the book club!</p>}
                <h2>Join the Discussion</h2>
                <CommentForm onSubmit={handleSubmitComment} />
                {/* <CommentList comments={commentsData.bookClubComments} /> */}
            </div>
        </div>
    );
};

export default BookClub;
