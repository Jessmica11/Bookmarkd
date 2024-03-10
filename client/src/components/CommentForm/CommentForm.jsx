import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <label>
        New Comment:
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </label>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
