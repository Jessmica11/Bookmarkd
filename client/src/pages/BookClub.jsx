import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const BookClub = () => {
    const { bookClubId } = useParams();
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchBookDetails();
        fetchComments();
    }, [bookClubId]);

    const fetchBookDetails = async () => {
        try {
            const response = await fetch(`/graphql?query={bookClub(id:${bookClubId}){book{title, imageUrl, description}}}`);
            const data = await response.json();
            setBook(data.bookClub.book);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`/graphql?query={bookClub(id:${bookClubId}){comments{id, text, user{name}}}}`);
            const data = await response.json();
            setComments(data.bookClub.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `mutation { addComment(bookClubId: ${bookClubId}, text: "${newComment}") { id } }` })
            });
            fetchComments();
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <h1>Book Club</h1>
            {book && (
                <div>
                    <img src={book.imageUrl} alt={book.title} />
                    <p>{book.description}</p>
                </div>
            )}
            <div>
                <h2>Discussion</h2>
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
