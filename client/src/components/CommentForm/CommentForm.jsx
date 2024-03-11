import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ bookClubId }) => {
  const [newComment, setNewComment] = useState('');
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await addComment({
        variables: {
          bookClubId: bookClubId,
          commentText: newComment,
          commentAuthor: 'User', 
        }
      });
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Form.Group controlId="formBasicComment">
        <Form.Label>New Comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Your Comment
      </Button>
      {error && <Alert variant="danger">Error adding comment. Please try again.</Alert>}
    </Form>
  );
};

export default CommentForm;
