import { Link } from "react-router-dom";
import { convertApiDate } from "../utils/dates";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Votes from "./Votes";

const CommentCard = ({ comment, deleteComment }) => {
  const { user } = useContext(UserContext);

  return (
    <li className="review-card" key={comment.comment_id}>
      <p>Author: {comment.author}</p>

      <p>Comment: {comment.body}</p>
      <Votes
        votingPath={"comments"}
        id={comment.comment_id}
        currentVotes={comment.votes}
      />
      <p>Posted on: {convertApiDate(comment.created_at)}</p>
      {user.username === comment.author ? (
        <button value={comment.comment_id} onClick={(e) => deleteComment(e)}>
          Delete this comment
        </button>
      ) : null}
    </li>
  );
};

export default CommentCard;
