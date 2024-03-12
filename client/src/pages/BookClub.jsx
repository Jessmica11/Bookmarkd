import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookClubDetails from '../components/BookClubs/BookClubDetails';

const BookClub = () => {
    const { bookClubId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
    }, [bookClubId]);

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            // to show what adding comments could look like 
            const timestamp = new Date().toLocaleString();
            const updatedComments = [...comments, { id: comments.length + 1, text: newComment, user: { name: 'User' }, timestamp }];
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            setError('Error adding comment');
        }
    };

    const handleDeleteComment = (commentId) => {
        const filteredComments = comments.filter(comment => comment.id !== commentId);
        setComments(filteredComments);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <BookClubDetails bookClubId={bookClubId} />
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Join the Discussion</h2>
                            <form onSubmit={handleSubmitComment}>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add your comment"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3>What Readers are Saying: </h3>
                        <ul className="list-group">
                            {comments.map(comment => (
                                <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{comment.user.name}</strong>: {comment.text}
                                        <small className="text-muted"> - {comment.timestamp}</small>
                                    </div>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookClub;
