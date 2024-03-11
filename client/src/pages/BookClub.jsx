import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookClubsData from '../components/BookClubs/BookClubsData'; // Import bookClubsData.js

const BookClub = () => {
    const { bookClubId } = useParams();
    const [bookClub, setBookClub] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookDetails();
        fetchComments();
    }, [bookClubId]);

    const fetchBookDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/graphql?query={bookClub(id: "${bookClubId}"){name, book{title, imageUrl, description}}}`);
            const data = await response.json();
            setBookClub(data.data.bookClub);
            setLoading(false);
        } catch (error) {
            setError('Error fetching book club details');
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/graphql?query={bookClub(id: "${bookClubId}"){comments{id, text, user{name}}}}`);
            const data = await response.json();
            setComments(data.data.bookClub.comments);
            setLoading(false);
        } catch (error) {
            setError('Error fetching comments');
            setLoading(false);
        }
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `mutation { addComment(bookClubId: "${bookClubId}", text: "${newComment}") { id } }` })
            });
            fetchComments();
            setNewComment('');
            setLoading(false);
        } catch (error) {
            setError('Error adding comment');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{bookClub && bookClub.name}</h1>
            {bookClub && (
                <div>
                    <img src={bookClub.book.imageUrl} alt={bookClub.book.title} />
                    <p>{bookClub.book.description}</p>
                </div>
            )}
            <div>
                <h2>Join the Discussion</h2>
                <div>
                    <form onSubmit={handleSubmitComment}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment"
                            required
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div>
                    <h3>Comments</h3>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <strong>{comment.user.name}</strong>: {comment.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookClub;
