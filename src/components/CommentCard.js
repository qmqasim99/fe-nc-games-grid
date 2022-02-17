import { Link } from 'react-router-dom';
import { convertApiDate } from '../utils/dates';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Votes from './Votes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const CommentCard = ({ comment, deleteComment }) => {
  const { user } = useContext(UserContext);

  return (
    <li className="comment-card" key={comment.comment_id}>
      <p>
        <AccountCircleIcon
          style={{ verticalAlign: 'middle', marginLeft: '0px' }}
        />{' '}
        {comment.author}
      </p>
      <p>{comment.body}</p>
      <Votes
        votingPath={'comments'}
        id={comment.comment_id}
        currentVotes={comment.votes}
      />
      <p>
        {' '}
        <EventNoteIcon className="avatar" />
        {convertApiDate(comment.created_at)}
      </p>
      {user.username === comment.author ? (
        <Button
          color="error"
          value={comment.comment_id}
          onClick={(e) => deleteComment(e)}
          size="small"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete this comment
        </Button>
      ) : null}
    </li>
  );
};

export default CommentCard;
